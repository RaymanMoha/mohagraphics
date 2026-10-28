type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };
type Result = { message: string; provider: string } | { unavailable: 'rate_limit' | 'provider_error' };

export async function requestPortfolioChat(messages: ChatMessage[], request: typeof fetch = fetch): Promise<Result> {
  const models = Array.from(new Set([process.env.GROQ_MODEL || 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b']));
  let rateLimited = false;
  for (const model of models) {
    try {
      const response = await request('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({ model, messages, max_tokens: 650, temperature: 0.2 }),
      });
      if (response.ok) {
        const data = await response.json();
        const message = data.choices?.[0]?.message?.content;
        if (typeof message === 'string' && message.trim()) return { message, provider: `Groq (${model})` };
      } else {
        rateLimited ||= response.status === 429;
        console.warn('Portfolio chat provider status', response.status, model);
        // A second model has a separate capacity limit; auth failures need configuration repair.
        if ([401, 403].includes(response.status)) break;
      }
    } catch {
      console.warn('Portfolio chat provider request failed', model);
    }
  }
  return { unavailable: rateLimited ? 'rate_limit' : 'provider_error' };
}

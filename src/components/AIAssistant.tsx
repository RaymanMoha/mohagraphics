import { useEffect, useRef, useState } from 'react';
import { IoClose, IoChatbubbleEllipses, IoSend } from 'react-icons/io5';
import { useChatContext } from '../contexts/ChatContext';
import { ChatReply } from './Chat/ChatReply';
import styles from './Chat/styles.module.css';

type Message = { role: 'user' | 'assistant'; content: string };
type Props = { isOpen?: boolean; onToggle?: () => void };
const suggestions = [
  { label: 'Explore projects', question: 'What projects has Mohammed worked on?' },
  { label: 'Watch films', question: 'Where can I watch the films and motion work?' },
  { label: 'Explore services', question: 'What can I hire Mohammed for?' },
  { label: 'Start a project', question: 'How can I discuss a project and book a call?' },
];

export default function AIAssistant({ isOpen: externalIsOpen, onToggle }: Props = {}) {
  const { isChatOpen, openChat, closeChat } = useChatContext();
  const isOpen = externalIsOpen ?? isChatOpen;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const setOpen = (open: boolean) => {
    if (open) openerRef.current = document.activeElement as HTMLElement;
    if (externalIsOpen !== undefined && onToggle) onToggle();
    else if (open) openChat();
    else closeChat();
    if (!open) openerRef.current?.focus();
  };
  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) (openerRef.current?.isConnected ? openerRef.current : launcherRef.current)?.focus();
      wasOpen.current = false;
      return;
    }
    if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) openerRef.current = document.activeElement;
    wasOpen.current = true;
    inputRef.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { closeChat(); onToggle?.(); openerRef.current?.focus(); } };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [isOpen, closeChat, onToggle]);
  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async (question = input) => {
    const content = question.trim();
    if (!content || loading) return;
    setMessages((previous) => [...previous, { role: 'user', content }]);
    setInput(''); setLoading(true);
    try {
      const response = await fetch('/api/chat-ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(25000),
        body: JSON.stringify({ message: content, conversationHistory: messages }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.message !== 'string') throw new Error('Chat request failed');
      setMessages((previous) => [...previous, { role: 'assistant', content: data.message }]);
    } catch {
      setMessages((previous) => [...previous, { role: 'assistant', content: 'I couldn’t get a reply just now. Please try again, or explore /services and /films. You can also [email Mohammed](mailto:abdulmoharayman@gmail.com).' }]);
    } finally { setLoading(false); inputRef.current?.focus(); }
  };

  if (!isOpen) return <button ref={launcherRef} type="button" className={styles.launcher} onClick={() => setOpen(true)} aria-label="Open portfolio assistant"><IoChatbubbleEllipses /></button>;
  return <aside className={styles.panel} role="dialog" aria-modal="false" aria-labelledby="assistant-title">
    <header className={styles.header}><div><h2 id="assistant-title">Portfolio assistant</h2><p>Projects, creative work &amp; working together</p></div>
      <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close portfolio assistant"><IoClose /></button>
    </header>
    <div className={styles.messages} ref={messagesRef} role="log" aria-live="polite" aria-label="Conversation" aria-relevant="additions">
      {!messages.length && <div className={styles.welcome}><p><strong>What would you like to explore?</strong><br />I can help you find relevant work, understand the services, or get a project started.</p>
        <div className={styles.suggestions}>{suggestions.map((item) => <button key={item.label} type="button" onClick={() => sendMessage(item.question)}>{item.label}</button>)}</div>
      </div>}
      {messages.map((message, index) => <div key={index} className={`${styles.message} ${message.role === 'user' ? styles.user : ''}`}><small>{message.role === 'user' ? 'You' : 'Portfolio assistant'}</small>
        {message.role === 'user' ? <p>{message.content}</p> : <div className={styles.reply}><ChatReply content={message.content} /></div>}
      </div>)}
      {loading && <div className={styles.typing} role="status">Finding a reply…</div>}
    </div>
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
      <input ref={inputRef} aria-label="Your message" placeholder="Ask about the work…" value={input} maxLength={4000} onChange={(event) => setInput(event.target.value)} />
      <button type="submit" aria-label="Send message" disabled={loading || !input.trim()}><IoSend /></button>
    </form>
  </aside>;
}

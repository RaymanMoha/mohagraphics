// IndexNow ownership keys are intentionally public, not API credentials.

const host = 'www.mohagraphics.tech';
const origin = `https://${host}`;
const key = '55140ef257428cd048f57b62317754c1';
const keyLocation = `${origin}/${key}.txt`;
const publishedKey = await fetch(keyLocation, { signal: AbortSignal.timeout(20000) });
if (!publishedKey.ok || (await publishedKey.text()).trim() !== key) {
  throw new Error('Deploy and verify the public ownership key before notifying IndexNow.');
}
const sitemapResponse = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(20000) });
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))];
if (!urlList.length || urlList.some((url) => new URL(url).origin !== origin)) {
  throw new Error('The sitemap must contain public URLs on the portfolio domain.');
}
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', signal: AbortSignal.timeout(30000), headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
console.log(`IndexNow: HTTP ${response.status}; ${urlList.length} URLs submitted.`);
if (![200, 202].includes(response.status)) {
  console.error((await response.text()).slice(0, 1000)); process.exitCode = 1;
} else {
  console.log('Submission accepted for processing. Indexing and ranking are not guaranteed.');
}

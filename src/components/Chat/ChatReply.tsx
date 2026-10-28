import { Fragment, ReactNode } from 'react';

const safeHref = (href: string) => /^(https:\/\/|mailto:)/i.test(href) || (href.startsWith('/') && !href.startsWith('//'));
const tokenPattern = /(\[[^\]\n]+\]\([^\s)]+\)|\*\*[^*\n]+\*\*|https?:\/\/[^\s<>]+|\/(?:projects|services|campaigns|films|about|files)(?:[\w\-./#?=&%]*))/g;

function inline(text: string): ReactNode[] {
  return text.split(tokenPattern).filter(Boolean).map((token, index) => {
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={index}>{token.slice(2, -2)}</strong>;
    const markdown = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const rawHref = markdown?.[2] || (/^(https?:\/\/|\/)/.test(token) ? token : null);
    if (!rawHref) return <Fragment key={index}>{token}</Fragment>;
    const href = rawHref.replace(/[.,;!]+$/, '');
    if (!safeHref(href)) return <Fragment key={index}>{markdown?.[1] || token}</Fragment>;
    const external = href.startsWith('https://');
    return <Fragment key={index}><a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{markdown?.[1] || href}</a>{markdown ? '' : rawHref.slice(href.length)}</Fragment>;
  });
}

// Render a small Markdown subset as React elements. HTML is always plain text.
export function ChatReply({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  const flushParagraph = () => { if (paragraph.length) blocks.push(<p key={blocks.length}>{inline(paragraph.join('\n'))}</p>); paragraph = []; };
  const flushList = () => { if (list.length) blocks.push(<ul key={blocks.length}>{list.map((item, index) => <li key={index}>{inline(item)}</li>)}</ul>); list = []; };
  for (const line of content.split('\n')) {
    const bullet = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.+)$/);
    if (bullet) { flushParagraph(); list.push(bullet[1]); }
    else if (!line.trim()) { flushParagraph(); flushList(); }
    else { flushList(); paragraph.push(line.replace(/^#{1,6}\s+/, '')); }
  }
  flushParagraph(); flushList();
  return <>{blocks}</>;
}

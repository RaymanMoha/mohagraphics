// Lightweight ambient declaration to satisfy editors when Next types aren't picked up
// This is a safe fallback; if Next's own types are available, they will be used instead.
declare module 'next/head' {
  import * as React from 'react';
  const Head: React.ComponentType<any>;
  export default Head;
}

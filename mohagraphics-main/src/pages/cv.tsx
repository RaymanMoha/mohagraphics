import { useEffect } from 'react';
import Head from 'next/head';

export default function CV() {
  useEffect(() => {
    window.location.href = '/api/cv';
  }, []);

  return (
    <>
      <Head>
        <title>Mohammed Abdirahman - CV</title>
        <meta name="description" content="Mohammed Abdirahman's CV - Frontend & Mobile App Developer" />
      </Head>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading CV...
      </div>
    </>
  );
}

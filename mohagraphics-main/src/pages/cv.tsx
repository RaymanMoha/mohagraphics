import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CV() {
  const router = useRouter();

  useEffect(() => {
    // Use window.location for direct file access
    window.location.href = '/files/cv.pdf';
  }, []);

  // Show loading state while redirecting
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.2rem'
    }}>
      Loading CV...
    </div>
  );
}

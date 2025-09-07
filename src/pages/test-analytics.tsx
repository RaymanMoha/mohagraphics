import { useEffect, useState } from 'react';
import * as gtag from '../lib/gtag';

const AnalyticsTest = () => {
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    // Check if Google Analytics is loaded
    const checkGA = () => {
      if (typeof window !== 'undefined') {
        if (
          typeof window.gtag === 'function' &&
          Array.isArray(window.dataLayer)
        ) {
          setStatus('✅ Google Analytics is loaded and working!');

          // Send a test event
          gtag.event({
            action: 'test_page_view',
            category: 'analytics',
            label: 'Analytics Test Page',
          });
        } else {
          setStatus('❌ Google Analytics not detected');
        }
      }
    };

    // Wait a bit for GA to load
    setTimeout(checkGA, 2000);
  }, []);

  const testEvent = () => {
    gtag.event({
      action: 'test_button_click',
      category: 'engagement',
      label: 'Test Button',
    });
    alert('Test event sent! Check your Google Analytics Real-time events.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Google Analytics Test Page</h1>
      <p>
        <strong>Status:</strong> {status}
      </p>

      <div style={{ margin: '2rem 0' }}>
        <h3>Debug Information:</h3>
        <ul>
          <li>GA Tracking ID: G-E7GVNYS50S</li>
          <li>
            Page URL:{' '}
            {typeof window !== 'undefined'
              ? window.location.href
              : 'Loading...'}
          </li>
          <li>
            DataLayer exists:{' '}
            {typeof window !== 'undefined' && window.dataLayer
              ? '✅ Yes'
              : '❌ No'}
          </li>
          <li>
            Gtag function exists:{' '}
            {typeof window !== 'undefined' && typeof window.gtag === 'function'
              ? '✅ Yes'
              : '❌ No'}
          </li>
        </ul>
      </div>

      <button
        onClick={testEvent}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#007ACC',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Send Test Event
      </button>

      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
        }}
      >
        <h4>How to verify:</h4>
        <ol>
          <li>Open Google Analytics</li>
          <li>Go to Real-time → Events</li>
          <li>Click the &quot;Send Test Event&quot; button above</li>
          <li>You should see &quot;test_button_click&quot; event appear</li>
        </ol>
      </div>
    </div>
  );
};

export default AnalyticsTest;

"use client";

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track pageview
    trackEvent('pageview', {
      path: pathname,
      referrer: document.referrer,
      utm_source: searchParams?.get('utm_source'),
      utm_medium: searchParams?.get('utm_medium'),
      utm_campaign: searchParams?.get('utm_campaign'),
    });
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}

// Helper function to track events
export async function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  try {
    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('visitor_id', visitorId);
    }

    // Get or create session ID (expires after 30 minutes of inactivity)
    let sessionId = sessionStorage.getItem('session_id');
    const lastActivity = sessionStorage.getItem('last_activity');
    const now = Date.now();
    
    if (!sessionId || !lastActivity || (now - parseInt(lastActivity)) > 30 * 60 * 1000) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('session_id', sessionId);
    }
    sessionStorage.setItem('last_activity', now.toString());

    // Send event to analytics API
    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        visitorId,
        sessionId,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
        },
      }),
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
}

// Analytics tracking for visitor behavior and conversions

export const trackPageView = (pagePath: string) => {
  if (typeof window !== 'undefined') {
    // Track with custom endpoint
    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pagePath,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {}); // Silent fail
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        properties: properties || {},
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});
  }
};

export const trackFormProgress = (step: number, formData: Record<string, any>) => {
  trackEvent('form_progress', {
    step,
    data: formData,
  });
};

export const trackDemoStart = (phoneNumber: string, businessName: string) => {
  trackEvent('demo_started', {
    phone: phoneNumber,
    business: businessName,
  });
};

export const trackConversion = (plan: string, amount: number) => {
  trackEvent('conversion', {
    plan,
    amount,
  });
};

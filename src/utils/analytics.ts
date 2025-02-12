declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!gaMeasurementId) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaMeasurementId);
};

// Track page view
export const pageview = (url: string) => {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!window.gtag || !gaMeasurementId) return;
  
  window.gtag('config', gaMeasurementId, {
    page_path: url,
  });
};

// Track event
export const event = (action: string, params: Record<string, any>) => {
  if (!window.gtag) return;
  
  window.gtag('event', action, params);
};

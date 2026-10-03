// Build-Konfiguration "app" für die native Capacitor-App:
// relative URLs funktionieren dort nicht, daher absolute Backend-URL.
export const environment = {
  production: true,
  apiUrl: 'https://keller.olconet.com/keller-backend',
  apiUrlSelf: 'https://keller.olconet.com',
};

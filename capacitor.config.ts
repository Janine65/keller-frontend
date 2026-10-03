import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.olconet.keller',
  appName: 'Keller Organisator',
  webDir: 'dist/apps/keller-frontend/browser',
  ios: {
    contentInset: 'automatic',
  },
  plugins: {
    SplashScreen: {
      // App ruft SplashScreen.hide() selbst auf, sobald sie geladen ist
      launchAutoHide: false,
    },
    // Nativer HTTP-Layer: umgeht WKWebView-CORS (capacitor:// -> http://localhost)
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;

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
      launchShowDuration: 1500,
      launchAutoHide: true,
    },
  },
};

export default config;

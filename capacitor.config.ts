
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.dailyjoycompass',
  appName: 'daily-joy-compass',
  webDir: 'dist',
  server: {
    url: "https://2e051887-d618-4af6-b29b-5fc1465cccc6.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  },
  android: {
    buildOptions: {
      keystorePath: "./android/app/my-release-key.keystore", // Replace with actual path
      keystorePassword: "your-keystore-password", // Replace with actual password
      keystoreAlias: "your-key-alias", // Replace with actual alias
      keystoreAliasPassword: "your-alias-password" // Replace with actual alias password
    }
  }
};

export default config;

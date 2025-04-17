
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.dailyjoycompass',
  appName: 'daily-joy-compass',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // For development, uncomment this to enable live reload from your dev server
    // url: 'http://YOUR-LOCAL-IP:5173',
    // cleartext: true
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
  // Android build configuration for release
  android: {
    buildOptions: {
      keystorePath: "./my-release-key.keystore", // Path relative to your Android project
      keystorePassword: "${KEYSTORE_PASSWORD}", // Use environment variable for security
      keystoreAlias: "dailyjoycompass",
      keystoreAliasPassword: "${ALIAS_PASSWORD}" // Use environment variable for security
    }
  },
  // iOS build configuration
  ios: {
    contentInset: "always"
  }
};

export default config;


import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.dailyjoycompass',
  appName: 'daily-joy-compass',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
  // To configure signing for release builds, uncomment the section below
  // and replace the values with your actual keystore information.
  // For development and testing, you can leave this commented out and
  // configure signing directly in Android Studio during the build process.
  /*
  android: {
    buildOptions: {
      keystorePath: "./my-release-key.keystore", // Path relative to your Android project or absolute path
      keystorePassword: "your-keystore-password",
      keystoreAlias: "your-key-alias",
      keystoreAliasPassword: "your-alias-password"
    }
  }
  */
};

export default config;

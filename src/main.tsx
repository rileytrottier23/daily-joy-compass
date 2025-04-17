
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Capacitor } from '@capacitor/core';

// Initialize the app
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

// Check if running on a mobile device with Capacitor
if (Capacitor.isNativePlatform()) {
  // Import mobile-specific plugins
  const initializeCapacitor = async () => {
    try {
      // Try to load the SplashScreen plugin
      try {
        const { SplashScreen } = await import('@capacitor/splash-screen');
        // Hide the splash screen with a fade
        SplashScreen.hide({
          fadeOutDuration: 300
        });
      } catch (splashError) {
        console.warn('SplashScreen plugin not available:', splashError);
      }
      
      // Try to load the StatusBar plugin
      if (Capacitor.getPlatform() === 'ios') {
        try {
          const { StatusBar, Style } = await import('@capacitor/status-bar');
          // Style the status bar using the correct enum
          StatusBar.setStyle({ style: Style.Dark });
        } catch (statusBarError) {
          console.warn('StatusBar plugin not available:', statusBarError);
        }
      }
    } catch (error) {
      console.error('Error initializing Capacitor plugins:', error);
    }
  };

  // Initialize Capacitor plugins
  initializeCapacitor();
}


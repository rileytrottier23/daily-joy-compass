
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
      const { SplashScreen } = await import('@capacitor/splash-screen');
      const { StatusBar } = await import('@capacitor/status-bar');
      
      // Hide the splash screen with a fade
      SplashScreen.hide({
        fadeOutDuration: 300
      });
      
      // Style the status bar if on iOS
      if (Capacitor.getPlatform() === 'ios') {
        StatusBar.setStyle({ style: 'dark' });
      }
    } catch (error) {
      console.error('Error initializing Capacitor plugins:', error);
    }
  };

  // Initialize Capacitor plugins
  initializeCapacitor();
}

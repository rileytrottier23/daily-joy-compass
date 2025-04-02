
/// <reference types="vite/client" />

// Capacitor build configuration types
interface CapacitorBuildOptions {
  /**
   * Path to your keystore file. Can be an absolute path or relative to your Android project
   * Example: "./my-release-key.keystore" or "/Users/username/keystores/my-app-key.jks"
   */
  keystorePath?: string;
  
  /**
   * The password for your keystore file
   */
  keystorePassword?: string;
  
  /**
   * The alias name in your keystore that identifies the key to use for signing
   */
  keystoreAlias?: string;
  
  /**
   * The password for your key alias
   */
  keystoreAliasPassword?: string;
}

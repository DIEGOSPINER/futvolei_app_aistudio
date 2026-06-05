import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.diegospiner.futvoleiapp',
  appName: 'Futevôlei Salvador',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

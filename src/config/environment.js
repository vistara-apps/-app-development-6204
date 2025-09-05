// Environment configuration
export const config = {
  // Base MiniApp Configuration
  baseChainId: import.meta.env.VITE_BASE_CHAIN_ID || 8453,
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,

  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.gigflow.app',
  websocketUrl: import.meta.env.VITE_WEBSOCKET_URL || 'wss://ws.gigflow.app',

  // External Job Board APIs
  upworkApiKey: import.meta.env.VITE_UPWORK_API_KEY,
  fiverrApiKey: import.meta.env.VITE_FIVERR_API_KEY,
  freelancerApiKey: import.meta.env.VITE_FREELANCER_API_KEY,

  // Feature Flags
  enableRealTimeAlerts: import.meta.env.VITE_ENABLE_REAL_TIME_ALERTS === 'true',
  enablePayments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',

  // Development
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate required environment variables
export const validateConfig = () => {
  const requiredVars = [];
  
  // Only validate required vars if we're in a runtime environment (not build time)
  // During build, these variables might not be available but the app can still be built
  if (config.isProduction && typeof window !== 'undefined') {
    if (!config.walletConnectProjectId) {
      console.warn('VITE_WALLET_CONNECT_PROJECT_ID is not set. Some features may not work properly.');
    }
  }

  if (requiredVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${requiredVars.join(', ')}`
    );
  }
};

import { useEffect, useCallback } from 'react';
import { websocketService } from '../services/websocketService.js';
import { useNotifications } from './useNotifications.js';
import { config } from '../config/environment.js';

export const useRealTimeGigs = (user, onNewGig, onApplicationUpdate) => {
  const { showGigAlert, showInfo } = useNotifications();

  // Handle new gig alerts
  const handleGigAlert = useCallback((gigData) => {
    if (onNewGig) {
      onNewGig(gigData);
    }
    showGigAlert(gigData);
  }, [onNewGig, showGigAlert]);

  // Handle application status updates
  const handleApplicationUpdate = useCallback((updateData) => {
    if (onApplicationUpdate) {
      onApplicationUpdate(updateData);
    }
    
    const { applicationId, status, gigTitle } = updateData;
    let message = '';
    
    switch (status) {
      case 'interviewing':
        message = `Great news! You've been selected for an interview for "${gigTitle}"`;
        break;
      case 'hired':
        message = `Congratulations! You've been hired for "${gigTitle}"`;
        break;
      case 'rejected':
        message = `Unfortunately, your application for "${gigTitle}" was not selected`;
        break;
      default:
        message = `Your application for "${gigTitle}" has been updated`;
    }
    
    showInfo(message, { duration: 6000 });
  }, [onApplicationUpdate, showInfo]);

  // Handle system notifications
  const handleSystemNotification = useCallback((notification) => {
    const { type, message, level = 'info' } = notification;
    
    switch (level) {
      case 'success':
        showInfo(message);
        break;
      case 'warning':
        showInfo(message);
        break;
      case 'error':
        showInfo(message);
        break;
      default:
        showInfo(message);
    }
  }, [showInfo]);

  // Handle connection status changes
  const handleConnectionChange = useCallback((isConnected) => {
    if (config.debugMode) {
      console.log('WebSocket connection status:', isConnected);
    }
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!user?.farcasterId || !config.enableRealTimeAlerts) {
      return;
    }

    // Connect to WebSocket
    websocketService.connect(user.farcasterId);

    // Set up event listeners
    websocketService.on('gigAlert', handleGigAlert);
    websocketService.on('applicationUpdate', handleApplicationUpdate);
    websocketService.on('systemNotification', handleSystemNotification);
    websocketService.on('connected', () => handleConnectionChange(true));
    websocketService.on('disconnected', () => handleConnectionChange(false));

    // Subscribe to gig alerts with user preferences
    if (user.preferences && user.notificationSettings?.gigAlerts) {
      websocketService.subscribeToGigAlerts(user.farcasterId, {
        skills: user.skills,
        minBudget: user.preferences.minBudget,
        maxBudget: user.preferences.maxBudget,
        remote: user.preferences.remote,
        platforms: user.preferences.preferredPlatforms || []
      });
    }

    // Cleanup on unmount
    return () => {
      websocketService.off('gigAlert', handleGigAlert);
      websocketService.off('applicationUpdate', handleApplicationUpdate);
      websocketService.off('systemNotification', handleSystemNotification);
      websocketService.off('connected', () => handleConnectionChange(true));
      websocketService.off('disconnected', () => handleConnectionChange(false));
      websocketService.disconnect();
    };
  }, [
    user?.farcasterId,
    user?.skills,
    user?.preferences,
    user?.notificationSettings,
    handleGigAlert,
    handleApplicationUpdate,
    handleSystemNotification,
    handleConnectionChange
  ]);

  // Update preferences when user settings change
  useEffect(() => {
    if (
      user?.farcasterId && 
      websocketService.isConnected && 
      user.notificationSettings?.gigAlerts
    ) {
      websocketService.updateGigAlertPreferences(user.farcasterId, {
        skills: user.skills,
        minBudget: user.preferences?.minBudget,
        maxBudget: user.preferences?.maxBudget,
        remote: user.preferences?.remote,
        platforms: user.preferences?.preferredPlatforms || []
      });
    }
  }, [
    user?.farcasterId,
    user?.skills,
    user?.preferences,
    user?.notificationSettings?.gigAlerts
  ]);

  // Return connection status and control functions
  return {
    isConnected: websocketService.isConnected,
    connectionStatus: websocketService.getConnectionStatus(),
    
    // Manual control functions
    connect: () => websocketService.connect(user?.farcasterId),
    disconnect: () => websocketService.disconnect(),
    
    // Subscription management
    subscribeToAlerts: (preferences) => {
      if (user?.farcasterId) {
        websocketService.subscribeToGigAlerts(user.farcasterId, preferences);
      }
    },
    
    unsubscribeFromAlerts: () => {
      if (user?.farcasterId) {
        websocketService.unsubscribeFromGigAlerts(user.farcasterId);
      }
    },
    
    updatePreferences: (preferences) => {
      if (user?.farcasterId && websocketService.isConnected) {
        websocketService.updateGigAlertPreferences(user.farcasterId, preferences);
      }
    }
  };
};

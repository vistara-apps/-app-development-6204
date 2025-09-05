import { config } from '../config/environment.js';

export class WebSocketService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
    this.isConnected = false;
    this.shouldReconnect = true;
  }

  // Connect to WebSocket server
  connect(userId) {
    if (!config.enableRealTimeAlerts || !config.websocketUrl) {
      console.log('WebSocket disabled or URL not configured');
      return;
    }

    try {
      const wsUrl = `${config.websocketUrl}?userId=${userId}`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.isConnected = false;
        this.emit('disconnected');

        if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.scheduleReconnect(userId);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.emit('error', error);
    }
  }

  // Disconnect from WebSocket
  disconnect() {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }

  // Schedule reconnection attempt
  scheduleReconnect(userId) {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
    
    setTimeout(() => {
      if (this.shouldReconnect) {
        this.connect(userId);
      }
    }, delay);
  }

  // Handle incoming messages
  handleMessage(data) {
    const { type, payload } = data;

    switch (type) {
      case 'gig_alert':
        this.emit('gigAlert', payload);
        break;
      case 'application_update':
        this.emit('applicationUpdate', payload);
        break;
      case 'system_notification':
        this.emit('systemNotification', payload);
        break;
      case 'ping':
        this.send({ type: 'pong' });
        break;
      default:
        console.log('Unknown message type:', type);
    }
  }

  // Send message to server
  send(data) {
    if (this.ws && this.isConnected) {
      try {
        this.ws.send(JSON.stringify(data));
      } catch (error) {
        console.error('Error sending WebSocket message:', error);
      }
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  // Subscribe to user's gig alerts
  subscribeToGigAlerts(userId, preferences) {
    this.send({
      type: 'subscribe_gig_alerts',
      payload: {
        userId,
        preferences
      }
    });
  }

  // Unsubscribe from gig alerts
  unsubscribeFromGigAlerts(userId) {
    this.send({
      type: 'unsubscribe_gig_alerts',
      payload: { userId }
    });
  }

  // Update subscription preferences
  updateGigAlertPreferences(userId, preferences) {
    this.send({
      type: 'update_gig_preferences',
      payload: {
        userId,
        preferences
      }
    });
  }

  // Event listener management
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket event callback:', error);
        }
      });
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      readyState: this.ws ? this.ws.readyState : WebSocket.CLOSED
    };
  }
}

// Create singleton instance
export const websocketService = new WebSocketService();

// WebSocket ready states for reference
export const WS_READY_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3
};

import React, { useState } from 'react';
import { Save, Bell, DollarSign, Filter, User, Shield } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications.js';
import LoadingSpinner, { ButtonSpinner } from './LoadingSpinner.jsx';

const Settings = ({ user, onUpdateUser }) => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    notifications: user.notificationSettings || {
      alerts: true,
      email: true,
      push: true,
      gigAlerts: true,
      applicationUpdates: true,
      weeklyDigest: false
    },
    preferences: user.preferences || {
      minBudget: 500,
      maxBudget: 5000,
      remote: true,
      partTime: true,
      fullTime: true,
      preferredPlatforms: [],
      autoApply: false
    },
    privacy: {
      profileVisible: true,
      showSkills: true,
      showExperience: true,
      allowMessages: true
    }
  });

  const { showSuccess, showError } = useNotifications();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onUpdateUser({
        notificationSettings: settings.notifications,
        preferences: settings.preferences,
        privacy: settings.privacy
      });
      showSuccess('Settings saved successfully!');
    } catch (error) {
      showError('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const sections = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Gig Preferences', icon: Filter },
    { id: 'budget', label: 'Budget Settings', icon: DollarSign },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const SectionButton = ({ section, isActive, onClick }) => {
    const Icon = section.icon;
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-colors duration-200 ${
          isActive
            ? 'bg-primary text-white'
            : 'text-text-secondary hover:bg-gray-100'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{section.label}</span>
      </button>
    );
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <h4 className="font-medium text-text-primary">{label}</h4>
        {description && (
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
          enabled ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Notification Preferences
      </h3>
      
      <ToggleSwitch
        enabled={settings.notifications.gigAlerts}
        onChange={(value) => updateSetting('notifications', 'gigAlerts', value)}
        label="Gig Alerts"
        description="Get notified when new gigs match your skills"
      />
      
      <ToggleSwitch
        enabled={settings.notifications.applicationUpdates}
        onChange={(value) => updateSetting('notifications', 'applicationUpdates', value)}
        label="Application Updates"
        description="Receive updates on your application status"
      />
      
      <ToggleSwitch
        enabled={settings.notifications.email}
        onChange={(value) => updateSetting('notifications', 'email', value)}
        label="Email Notifications"
        description="Send notifications to your email address"
      />
      
      <ToggleSwitch
        enabled={settings.notifications.push}
        onChange={(value) => updateSetting('notifications', 'push', value)}
        label="Push Notifications"
        description="Show browser push notifications"
      />
      
      <ToggleSwitch
        enabled={settings.notifications.weeklyDigest}
        onChange={(value) => updateSetting('notifications', 'weeklyDigest', value)}
        label="Weekly Digest"
        description="Get a weekly summary of new opportunities"
      />
    </div>
  );

  const renderPreferenceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Gig Preferences
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Work Type
        </label>
        <div className="space-y-2">
          <ToggleSwitch
            enabled={settings.preferences.remote}
            onChange={(value) => updateSetting('preferences', 'remote', value)}
            label="Remote Work"
          />
          <ToggleSwitch
            enabled={settings.preferences.partTime}
            onChange={(value) => updateSetting('preferences', 'partTime', value)}
            label="Part-time Projects"
          />
          <ToggleSwitch
            enabled={settings.preferences.fullTime}
            onChange={(value) => updateSetting('preferences', 'fullTime', value)}
            label="Full-time Projects"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Preferred Platforms
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['upwork', 'fiverr', 'freelancer', 'toptal'].map(platform => (
            <label key={platform} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.preferences.preferredPlatforms.includes(platform)}
                onChange={(e) => {
                  const platforms = settings.preferences.preferredPlatforms;
                  if (e.target.checked) {
                    updateSetting('preferences', 'preferredPlatforms', [...platforms, platform]);
                  } else {
                    updateSetting('preferences', 'preferredPlatforms', platforms.filter(p => p !== platform));
                  }
                }}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-primary capitalize">{platform}</span>
            </label>
          ))}
        </div>
      </div>
      
      <ToggleSwitch
        enabled={settings.preferences.autoApply}
        onChange={(value) => updateSetting('preferences', 'autoApply', value)}
        label="Auto-apply to High Matches"
        description="Automatically apply to gigs with 95%+ match (Premium feature)"
      />
    </div>
  );

  const renderBudgetSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Budget Preferences
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Minimum Budget ($)
          </label>
          <input
            type="number"
            value={settings.preferences.minBudget}
            onChange={(e) => updateSetting('preferences', 'minBudget', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Maximum Budget ($)
          </label>
          <input
            type="number"
            value={settings.preferences.maxBudget}
            onChange={(e) => updateSetting('preferences', 'maxBudget', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            min="0"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Budget Range:</strong> ${settings.preferences.minBudget.toLocaleString()} - ${settings.preferences.maxBudget.toLocaleString()}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          This range will be used to filter and score gig matches
        </p>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Privacy Settings
      </h3>
      
      <ToggleSwitch
        enabled={settings.privacy.profileVisible}
        onChange={(value) => updateSetting('privacy', 'profileVisible', value)}
        label="Profile Visibility"
        description="Make your profile visible to potential clients"
      />
      
      <ToggleSwitch
        enabled={settings.privacy.showSkills}
        onChange={(value) => updateSetting('privacy', 'showSkills', value)}
        label="Show Skills"
        description="Display your skills on your public profile"
      />
      
      <ToggleSwitch
        enabled={settings.privacy.allowMessages}
        onChange={(value) => updateSetting('privacy', 'allowMessages', value)}
        label="Allow Messages"
        description="Allow clients to send you direct messages"
      />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotificationSettings();
      case 'preferences':
        return renderPreferenceSettings();
      case 'budget':
        return renderBudgetSettings();
      case 'privacy':
        return renderPrivacySettings();
      default:
        return renderNotificationSettings();
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-card overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Settings</h2>
          <nav className="space-y-2">
            {sections.map(section => (
              <SectionButton
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {renderContent()}
          
          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isLoading ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

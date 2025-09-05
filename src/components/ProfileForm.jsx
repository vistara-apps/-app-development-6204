import React, { useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

const ProfileForm = ({ user, onSave, variant = 'edit' }) => {
  const [formData, setFormData] = useState({
    skills: user.skills || [],
    preferences: user.preferences || {
      minBudget: 500,
      maxBudget: 5000,
      remote: true,
      partTime: true
    },
    notificationSettings: user.notificationSettings || {
      alerts: true,
      email: true,
      push: true
    }
  });

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="bg-surface rounded-lg shadow-card p-6 space-y-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        {variant === 'edit' ? 'Edit Profile' : 'Setup Profile'}
      </h2>

      {/* Skills Section */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Your Skills
        </label>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded-lg text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="hover:bg-blue-600 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="Add a skill..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Budget Preferences */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Budget Preferences
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-text-secondary mb-1">Min Budget ($)</label>
            <input
              type="number"
              value={formData.preferences.minBudget}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  minBudget: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary mb-1">Max Budget ($)</label>
            <input
              type="number"
              value={formData.preferences.maxBudget}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  maxBudget: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Work Preferences */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Work Preferences
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.preferences.remote}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  remote: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-text-secondary">Remote work</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.preferences.partTime}
              onChange={(e) => setFormData({
                ...formData,
                preferences: {
                  ...formData.preferences,
                  partTime: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-text-secondary">Part-time projects</span>
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Notification Settings
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notificationSettings.alerts}
              onChange={(e) => setFormData({
                ...formData,
                notificationSettings: {
                  ...formData.notificationSettings,
                  alerts: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-text-secondary">Gig alerts</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notificationSettings.email}
              onChange={(e) => setFormData({
                ...formData,
                notificationSettings: {
                  ...formData.notificationSettings,
                  email: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-text-secondary">Email notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notificationSettings.push}
              onChange={(e) => setFormData({
                ...formData,
                notificationSettings: {
                  ...formData.notificationSettings,
                  push: e.target.checked
                }
              })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-text-secondary">Push notifications</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
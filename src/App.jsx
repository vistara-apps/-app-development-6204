import React, { useState } from 'react';
import AppShell from './components/AppShell.jsx';
import Dashboard from './components/Dashboard.jsx';
import GigFeed from './components/GigFeed.jsx';
import ApplicationTracker from './components/ApplicationTracker.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import { mockUser, mockGigs, mockApplications } from './data/mockData.js';
import { GigStatus } from './types/index.js';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(mockUser);
  const [gigs, setGigs] = useState(mockGigs);
  const [applications, setApplications] = useState(mockApplications);

  // Handle gig application
  const handleApplyToGig = (gig) => {
    const newApplication = {
      id: `app-${Date.now()}`,
      userId: user.farcasterId,
      gigId: gig.id,
      applicationDate: new Date().toISOString().split('T')[0],
      status: GigStatus.APPLIED,
      notes: `Applied to ${gig.title}`,
      url: gig.url
    };

    setApplications(prev => [...prev, newApplication]);
    
    // Open the gig URL in a new tab
    window.open(gig.url, '_blank');
    
    // Show success message (you could implement a toast notification here)
    alert(`Successfully applied to "${gig.title}"! The job page has been opened in a new tab.`);
  };

  // Handle saving a gig
  const handleSaveGig = (gig) => {
    const newApplication = {
      id: `save-${Date.now()}`,
      userId: user.farcasterId,
      gigId: gig.id,
      applicationDate: new Date().toISOString().split('T')[0],
      status: GigStatus.SAVED,
      notes: 'Saved for later',
      url: gig.url
    };

    setApplications(prev => [...prev, newApplication]);
    alert(`"${gig.title}" has been saved to your applications!`);
  };

  // Handle updating application
  const handleUpdateApplication = (updatedApplication) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  };

  // Handle profile update
  const handleUpdateProfile = (updatedProfile) => {
    setUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
    alert('Profile updated successfully!');
  };

  // Render current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            gigs={gigs}
            applications={applications}
          />
        );
      case 'gigs':
        return (
          <GigFeed 
            gigs={gigs}
            applications={applications}
            onApply={handleApplyToGig}
            onSave={handleSaveGig}
          />
        );
      case 'applications':
        return (
          <ApplicationTracker 
            applications={applications}
            gigs={gigs}
            onUpdateApplication={handleUpdateApplication}
          />
        );
      case 'profile':
        return (
          <ProfileForm 
            user={user}
            onSave={handleUpdateProfile}
            variant="edit"
          />
        );
      case 'settings':
        return (
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Settings</h2>
            <p className="text-text-secondary">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard user={user} gigs={gigs} applications={applications} />;
    }
  };

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </AppShell>
  );
}

export default App;
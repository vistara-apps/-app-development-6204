import React, { useState, useEffect } from 'react';
import AppShell from './components/AppShell.jsx';
import Dashboard from './components/Dashboard.jsx';
import GigFeed from './components/GigFeed.jsx';
import ApplicationTracker from './components/ApplicationTracker.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import Settings from './components/Settings.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import NotificationSystem from './components/NotificationSystem.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import { mockUser, mockGigs, mockApplications } from './data/mockData.js';
import { GigStatus } from './types/index.js';
import { useNotifications } from './hooks/useNotifications.js';
import { useRealTimeGigs } from './hooks/useRealTimeGigs.js';
import { gigService } from './services/gigService.js';
import { config, validateConfig } from './config/environment.js';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(mockUser);
  const [gigs, setGigs] = useState([]);
  const [applications, setApplications] = useState(mockApplications);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { showApplicationSuccess, showProfileUpdate, showError, showGigAlert } = useNotifications();

  // Handle new gigs from real-time alerts
  const handleNewGig = (newGig) => {
    setGigs(prev => {
      // Check if gig already exists
      const exists = prev.some(gig => gig.id === newGig.id);
      if (!exists) {
        return [newGig, ...prev];
      }
      return prev;
    });
  };

  // Handle application updates from real-time alerts
  const handleApplicationUpdate = (updateData) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === updateData.applicationId 
          ? { ...app, status: updateData.status, notes: updateData.notes || app.notes }
          : app
      )
    );
  };

  // Set up real-time gig alerts
  const { isConnected: wsConnected } = useRealTimeGigs(
    user, 
    handleNewGig, 
    handleApplicationUpdate
  );

  // Initialize app and validate configuration
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Validate environment configuration
        validateConfig();
        
        // Load initial gigs with user matching
        const matchingGigs = await gigService.getMatchingGigs(user);
        setGigs(matchingGigs);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize app:', err);
        setError(err.message);
        setIsLoading(false);
        
        // Fallback to mock data
        const matchingGigs = gigService.calculateMatches(mockGigs, user);
        setGigs(matchingGigs);
      }
    };

    initializeApp();
  }, [user]);

  // Handle gig application
  const handleApplyToGig = async (gig) => {
    try {
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
      
      // Show success notification
      showApplicationSuccess(gig.title);
    } catch (err) {
      showError('Failed to apply to gig. Please try again.');
    }
  };

  // Handle saving a gig
  const handleSaveGig = async (gig) => {
    try {
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
      showApplicationSuccess(`"${gig.title}" has been saved!`);
    } catch (err) {
      showError('Failed to save gig. Please try again.');
    }
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
  const handleUpdateProfile = async (updatedProfile) => {
    try {
      setUser(prev => ({
        ...prev,
        ...updatedProfile
      }));
      
      // Refresh gigs with new user profile
      const matchingGigs = await gigService.getMatchingGigs({ ...user, ...updatedProfile });
      setGigs(matchingGigs);
      
      showProfileUpdate();
    } catch (err) {
      showError('Failed to update profile. Please try again.');
    }
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
          <Settings 
            user={user}
            onUpdateUser={handleUpdateProfile}
          />
        );
      default:
        return <Dashboard user={user} gigs={gigs} applications={applications} />;
    }
  };

  // Show loading screen during initialization
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <LoadingSpinner 
          size="xl" 
          text="Loading GigFlow..." 
          className="text-center"
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg">
        <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </AppShell>
        <NotificationSystem />
      </div>
    </ErrorBoundary>
  );
}

export default App;

import React, { useState } from 'react';
import { Calendar, Filter, Plus } from 'lucide-react';
import GigCard from './GigCard.jsx';
import { GigStatus } from '../types/index.js';

const ApplicationTracker = ({ applications, gigs, onUpdateApplication }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Get gig details for applications
  const applicationsWithGigs = applications.map(app => ({
    ...app,
    gig: gigs.find(gig => gig.id === app.gigId) || {
      id: app.gigId,
      title: 'Unknown Gig',
      description: 'Gig details not available',
      platform: 'unknown',
      skillsRequired: [],
      url: app.url || '#',
      budget: 'N/A',
      duration: 'N/A',
      location: 'N/A'
    }
  }));

  // Filter applications
  const filteredApplications = applicationsWithGigs
    .filter(app => filterStatus === 'all' || app.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.applicationDate) - new Date(a.applicationDate);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  // Get status counts
  const statusCounts = {
    all: applications.length,
    applied: applications.filter(app => app.status === GigStatus.APPLIED).length,
    interviewing: applications.filter(app => app.status === GigStatus.INTERVIEWING).length,
    hired: applications.filter(app => app.status === GigStatus.HIRED).length,
    rejected: applications.filter(app => app.status === GigStatus.REJECTED).length,
  };

  const StatusTab = ({ status, label, count }) => (
    <button
      onClick={() => setFilterStatus(status)}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
        ${filterStatus === status
          ? 'bg-primary text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {label} ({count})
    </button>
  );

  const AddNoteModal = ({ application, onSave, onClose }) => {
    const [notes, setNotes] = useState(application.notes || '');
    const [status, setStatus] = useState(application.status);

    const handleSave = () => {
      onSave({
        ...application,
        notes,
        status
      });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Update Application
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value={GigStatus.APPLIED}>Applied</option>
                <option value={GigStatus.INTERVIEWING}>Interviewing</option>
                <option value={GigStatus.HIRED}>Hired</option>
                <option value={GigStatus.REJECTED}>Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this application..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Application Tracker
          </h2>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          <StatusTab status="all" label="All" count={statusCounts.all} />
          <StatusTab status={GigStatus.APPLIED} label="Applied" count={statusCounts.applied} />
          <StatusTab status={GigStatus.INTERVIEWING} label="Interviewing" count={statusCounts.interviewing} />
          <StatusTab status={GigStatus.HIRED} label="Hired" count={statusCounts.hired} />
          <StatusTab status={GigStatus.REJECTED} label="Rejected" count={statusCounts.rejected} />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map(app => (
          <div key={app.id} className="relative">
            <GigCard
              gig={app.gig}
              application={app}
              variant="applied"
              onApply={() => {}}
              onSave={() => {}}
            />
            <button
              onClick={() => setSelectedApplication(app)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No applications found
          </h3>
          <p className="text-text-secondary">
            {filterStatus === 'all' 
              ? "You haven't applied to any gigs yet"
              : `No applications with status "${filterStatus}"`
            }
          </p>
        </div>
      )}

      {/* Update Modal */}
      {selectedApplication && (
        <AddNoteModal
          application={selectedApplication}
          onSave={onUpdateApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default ApplicationTracker;
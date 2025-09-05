import React from 'react';
import { ExternalLink, Clock, MapPin, DollarSign, Star } from 'lucide-react';
import { GigStatus } from '../types/index.js';

const GigCard = ({ gig, application, onApply, onSave, variant = 'default' }) => {
  const isApplied = variant === 'applied' || application;
  
  const getStatusColor = (status) => {
    switch (status) {
      case GigStatus.APPLIED: return 'bg-blue-100 text-blue-800';
      case GigStatus.INTERVIEWING: return 'bg-yellow-100 text-yellow-800';
      case GigStatus.HIRED: return 'bg-green-100 text-green-800';
      case GigStatus.REJECTED: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-surface rounded-lg shadow-card hover:shadow-hover transition-all duration-200 p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-text-primary">{gig.title}</h3>
            {gig.match && (
              <div className="flex items-center space-x-1 text-green-600">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{gig.match}% match</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center space-x-1">
              <span className="capitalize">{gig.platform}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{gig.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{gig.location}</span>
            </div>
          </div>
        </div>

        {application && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
            {formatStatus(application.status)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-secondary mb-4 line-clamp-2">
        {gig.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {gig.skillsRequired.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Budget */}
      <div className="flex items-center space-x-1 text-primary font-medium mb-4">
        <DollarSign className="w-4 h-4" />
        <span>{gig.budget}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          {!isApplied ? (
            <>
              <button
                onClick={() => onApply(gig)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
              >
                Apply Now
              </button>
              <button
                onClick={() => onSave(gig)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>Applied on {new Date(application.applicationDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <a
          href={gig.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Application notes for applied gigs */}
      {application && application.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-text-secondary">
            <span className="font-medium">Notes:</span> {application.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default GigCard;
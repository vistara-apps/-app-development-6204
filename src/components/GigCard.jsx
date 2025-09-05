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
    <div className="bg-surface rounded-2xl shadow-card hover:shadow-hover transition-smooth p-6 animate-fade-in border border-gray-100 hover:border-gray-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-smooth">{gig.title}</h3>
            {gig.match && (
              <div className="flex items-center space-x-1 bg-success/10 text-success px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">{gig.match}% match</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="capitalize font-medium">{gig.platform}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{gig.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{gig.location}</span>
            </div>
          </div>
        </div>

        {application && (
          <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(application.status)}`}>
            {formatStatus(application.status)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-secondary mb-6 line-clamp-3 leading-relaxed">
        {gig.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {gig.skillsRequired.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium"
          >
            {skill}
          </span>
        ))}
        {gig.skillsRequired.length > 4 && (
          <span className="px-3 py-1 bg-gray-100 text-text-muted text-sm rounded-lg font-medium">
            +{gig.skillsRequired.length - 4} more
          </span>
        )}
      </div>

      {/* Budget */}
      <div className="flex items-center space-x-2 text-primary font-bold mb-6 bg-primary/5 px-4 py-2 rounded-xl">
        <DollarSign className="w-5 h-5" />
        <span className="text-lg">{gig.budget}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          {!isApplied ? (
            <>
              <button
                onClick={() => onApply(gig)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-smooth text-sm font-semibold shadow-md hover:shadow-lg focus-ring"
                aria-label={`Apply to ${gig.title}`}
              >
                Apply Now
              </button>
              <button
                onClick={() => onSave(gig)}
                className="px-6 py-3 border-2 border-gray-200 text-text-primary rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-smooth text-sm font-semibold focus-ring"
                aria-label={`Save ${gig.title} for later`}
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 text-sm text-text-muted bg-gray-50 px-4 py-2 rounded-xl">
              <Clock className="w-4 h-4" />
              <span>Applied on {new Date(application.applicationDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <a
          href={gig.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded-xl transition-smooth focus-ring group"
          aria-label={`View ${gig.title} on ${gig.platform}`}
        >
          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-smooth" />
        </a>
      </div>

      {/* Application notes for applied gigs */}
      {application && application.notes && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-sm text-text-primary">
            <span className="font-semibold text-primary">Notes:</span> {application.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default GigCard;

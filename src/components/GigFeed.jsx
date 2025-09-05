import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import GigCard from './GigCard.jsx';

const GigFeed = ({ gigs, applications, onApply, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('match');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort gigs
  const filteredGigs = gigs
    .filter(gig => {
      const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gig.skillsRequired.some(skill => 
                             skill.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesPlatform = filterPlatform === 'all' || gig.platform === filterPlatform;
      return matchesSearch && matchesPlatform;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return (b.match || 0) - (a.match || 0);
        case 'date':
          return new Date(b.postedDate) - new Date(a.postedDate);
        case 'budget':
          // Simple budget comparison (extract first number)
          const budgetA = parseInt(a.budget.replace(/[^0-9]/g, '')) || 0;
          const budgetB = parseInt(b.budget.replace(/[^0-9]/g, '')) || 0;
          return budgetB - budgetA;
        default:
          return 0;
      }
    });

  const platforms = [...new Set(gigs.map(gig => gig.platform))];

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search gigs by title, description, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="match">Sort by Match</option>
            <option value="date">Sort by Date</option>
            <option value="budget">Sort by Budget</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Platform
                </label>
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Platforms</option>
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Available Gigs ({filteredGigs.length})
        </h2>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-sm text-text-secondary hover:text-text-primary"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Gig Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGigs.map(gig => {
          const application = applications.find(app => app.gigId === gig.id);
          return (
            <GigCard
              key={gig.id}
              gig={gig}
              application={application}
              onApply={onApply}
              onSave={onSave}
              variant={application ? 'applied' : 'default'}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGigs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No gigs found
          </h3>
          <p className="text-text-secondary">
            {searchTerm 
              ? `No gigs match your search "${searchTerm}"`
              : 'No gigs available at the moment'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default GigFeed;
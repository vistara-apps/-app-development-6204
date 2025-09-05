import React from 'react';
import { TrendingUp, Users, Clock, DollarSign, Star, ArrowUp } from 'lucide-react';

const Dashboard = ({ user, gigs, applications }) => {
  // Calculate stats
  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => 
    app.status === 'applied' || app.status === 'interviewing'
  ).length;
  const successRate = totalApplications > 0 
    ? Math.round((applications.filter(app => app.status === 'hired').length / totalApplications) * 100)
    : 0;
  const avgMatch = gigs.length > 0 
    ? Math.round(gigs.reduce((sum, gig) => sum + (gig.match || 0), 0) / gigs.length)
    : 0;

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => (
    <div className="bg-surface rounded-lg shadow-card p-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{trend}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const RecentGig = ({ gig }) => (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {gig.platform.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          {gig.title}
        </p>
        <p className="text-xs text-text-secondary">
          {gig.budget} • {gig.duration}
        </p>
      </div>
      <div className="flex items-center text-green-600">
        <Star className="w-4 h-4 fill-current mr-1" />
        <span className="text-sm font-medium">{gig.match}%</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-blue-100">
          You have {gigs.filter(g => g.match >= 90).length} high-match gigs waiting for you.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={Users}
          trend={12}
          color="blue"
        />
        <StatCard
          title="Active Applications"
          value={activeApplications}
          icon={Clock}
          trend={8}
          color="yellow"
        />
        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
          icon={TrendingUp}
          trend={15}
          color="green"
        />
        <StatCard
          title="Avg Match Score"
          value={`${avgMatch}%`}
          icon={Star}
          trend={5}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent High-Match Gigs */}
        <div className="lg:col-span-2 bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              High-Match Gigs
            </h2>
            <span className="text-sm text-text-secondary">
              {gigs.filter(g => g.match >= 85).length} available
            </span>
          </div>
          <div className="space-y-1">
            {gigs
              .filter(gig => gig.match >= 85)
              .slice(0, 5)
              .map(gig => (
                <RecentGig key={gig.id} gig={gig} />
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
              <div className="font-medium">Find New Gigs</div>
              <div className="text-sm text-blue-100">Browse matching opportunities</div>
            </button>
            <button className="w-full p-3 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              <div className="font-medium text-text-primary">Update Profile</div>
              <div className="text-sm text-text-secondary">Add new skills or preferences</div>
            </button>
            <button className="w-full p-3 text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              <div className="font-medium text-text-primary">View Applications</div>
              <div className="text-sm text-text-secondary">Track your progress</div>
            </button>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="bg-surface rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Your Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
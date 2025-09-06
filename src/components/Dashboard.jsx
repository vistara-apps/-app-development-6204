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

  const StatCard = ({ title, value, icon: Icon, trend, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
    };

    return (
      <div className="bg-surface rounded-xl shadow-card hover:shadow-hover p-6 animate-slide-up transition-smooth border border-gray-100 group cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-text-muted font-medium uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-text-primary mt-2 group-hover:scale-105 transition-smooth">{value}</p>
            {trend && (
              <div className="flex items-center mt-3 text-success">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">+{trend}% from last month</span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-xl border-2 ${colorClasses[color]} group-hover:scale-110 transition-smooth`}>
            <Icon className="w-7 h-7" />
          </div>
        </div>
      </div>
    );
  };

  const RecentGig = ({ gig }) => (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-smooth cursor-pointer group border border-transparent hover:border-gray-200">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-smooth">
          <span className="text-white text-sm font-bold">
            {gig.platform.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate group-hover:text-primary transition-smooth">
          {gig.title}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {gig.budget} • {gig.duration}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center text-success bg-green-50 px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 fill-current mr-1" />
          <span className="text-sm font-semibold">{gig.match}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="relative bg-gradient-to-r from-primary via-blue-600 to-purple-600 rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-3">Welcome back, John! 👋</h1>
              <p className="text-blue-100 text-lg">
                You have <span className="font-semibold text-white">{gigs.filter(g => g.match >= 90).length}</span> high-match gigs waiting for you.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent High-Match Gigs */}
        <div className="lg:col-span-2 bg-surface rounded-2xl shadow-card border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-text-primary">
                High-Match Gigs
              </h2>
              <p className="text-sm text-text-muted mt-1">
                Opportunities that match your skills
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                {gigs.filter(g => g.match >= 85).length} available
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {gigs
              .filter(gig => gig.match >= 85)
              .slice(0, 5)
              .map(gig => (
                <RecentGig key={gig.id} gig={gig} />
              ))}
            {gigs.filter(g => g.match >= 85).length === 0 && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <p className="text-text-muted">No high-match gigs available right now</p>
                <p className="text-sm text-text-muted">Check back later or update your profile</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-2xl shadow-card border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">
            Quick Actions
          </h2>
          <div className="space-y-4">
            <button className="w-full p-4 text-left bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-smooth shadow-md hover:shadow-lg group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Find New Gigs</div>
                  <div className="text-sm text-blue-100 mt-1">Browse matching opportunities</div>
                </div>
                <Search className="w-5 h-5 group-hover:scale-110 transition-smooth" />
              </div>
            </button>
            <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-smooth border border-gray-200 hover:border-gray-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text-primary">Update Profile</div>
                  <div className="text-sm text-text-muted mt-1">Add new skills or preferences</div>
                </div>
                <User className="w-5 h-5 text-text-muted group-hover:scale-110 transition-smooth" />
              </div>
            </button>
            <button className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl transition-smooth border border-gray-200 hover:border-gray-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-text-primary">View Applications</div>
                  <div className="text-sm text-text-muted mt-1">Track your progress</div>
                </div>
                <FileText className="w-5 h-5 text-text-muted group-hover:scale-110 transition-smooth" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="bg-surface rounded-2xl shadow-card border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              Your Skills
            </h2>
            <p className="text-sm text-text-muted mt-1">
              Skills that help match you with relevant gigs
            </p>
          </div>
          <button className="text-primary hover:text-blue-600 text-sm font-semibold transition-smooth">
            Edit Skills
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-smooth cursor-pointer hover:scale-105"
            >
              {skill}
            </span>
          ))}
          <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-text-muted rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-smooth">
            + Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

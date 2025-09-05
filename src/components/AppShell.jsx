import React from 'react';
import { 
  Home, 
  Search, 
  FileText, 
  User, 
  Settings, 
  Bell,
  Menu,
  X
} from 'lucide-react';

const AppShell = ({ children, activeTab = 'dashboard', onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home, description: 'View your overview and stats' },
    { name: 'Find Gigs', id: 'gigs', icon: Search, description: 'Browse matching opportunities' },
    { name: 'Applications', id: 'applications', icon: FileText, description: 'Track your applications' },
    { name: 'Profile', id: 'profile', icon: User, description: 'Manage your profile' },
    { name: 'Settings', id: 'settings', icon: Settings, description: 'Configure preferences' },
  ];

  // Close sidebar when clicking outside or pressing Escape
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-surface shadow-xl transform transition-transform duration-300 ease-out custom-scrollbar
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-base">GF</span>
            </div>
            <span className="text-xl font-bold text-text-primary">GigFlow</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-smooth focus-ring"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" role="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-smooth focus-ring group
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-md transform scale-[1.02]' 
                    : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary hover:shadow-sm'
                  }
                `}
                aria-label={`${item.name} - ${item.description}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-5 h-5 mr-3 transition-smooth ${isActive ? 'text-white' : 'group-hover:scale-110'}`} />
                <span className="flex-1 text-left">{item.name}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce-subtle" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-border bg-gray-50">
          <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white transition-smooth cursor-pointer group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">John Doe</p>
              <p className="text-xs text-text-muted truncate">@johndoe • Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-surface/80 backdrop-blur-sm shadow-sm border-b border-border sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition-smooth focus-ring"
                  aria-label="Open navigation menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary capitalize">
                    {activeTab === 'gigs' ? 'Find Gigs' : activeTab}
                  </h1>
                  <p className="text-sm text-text-muted hidden sm:block">
                    {navigation.find(nav => nav.id === activeTab)?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  className="relative p-3 text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-xl transition-smooth focus-ring group"
                  aria-label="View notifications"
                >
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-smooth" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-bounce-subtle"></span>
                  <span className="absolute top-1 right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center font-bold">
                    3
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;

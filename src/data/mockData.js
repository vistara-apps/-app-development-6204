import { GigStatus, Platform } from '../types/index.js';

export const mockUser = {
  farcasterId: 'user123',
  walletAddress: '0x1234...abcd',
  skills: ['React', 'Node.js', 'TypeScript', 'UI/UX Design', 'Python'],
  preferences: {
    minBudget: 500,
    maxBudget: 5000,
    remote: true,
    partTime: true
  },
  notificationSettings: {
    alerts: true,
    email: true,
    push: true
  }
};

export const mockGigs = [
  {
    id: 'gig-1',
    externalId: 'up-001',
    title: 'React Dashboard Development',
    description: 'Looking for an experienced React developer to build a modern analytics dashboard with real-time data visualization.',
    platform: Platform.UPWORK,
    skillsRequired: ['React', 'TypeScript', 'Chart.js'],
    url: 'https://upwork.com/jobs/react-dashboard',
    postedDate: '2024-01-15',
    location: 'Remote',
    budget: '$2,000 - $4,000',
    duration: '2-3 weeks',
    match: 95
  },
  {
    id: 'gig-2',
    externalId: 'fv-002',
    title: 'Node.js API Integration',
    description: 'Need a backend developer to integrate multiple third-party APIs into our existing Node.js application.',
    platform: Platform.FIVERR,
    skillsRequired: ['Node.js', 'Express', 'API Integration'],
    url: 'https://fiverr.com/jobs/nodejs-api',
    postedDate: '2024-01-14',
    location: 'Remote',
    budget: '$800 - $1,500',
    duration: '1-2 weeks',
    match: 88
  },
  {
    id: 'gig-3',
    externalId: 'tp-003',
    title: 'UI/UX Design for Mobile App',
    description: 'Seeking a talented UI/UX designer to create intuitive and beautiful designs for our mobile application.',
    platform: Platform.TOPTAL,
    skillsRequired: ['UI/UX Design', 'Figma', 'Mobile Design'],
    url: 'https://toptal.com/jobs/mobile-ui-design',
    postedDate: '2024-01-13',
    location: 'Remote',
    budget: '$3,000 - $5,000',
    duration: '3-4 weeks',
    match: 82
  },
  {
    id: 'gig-4',
    externalId: 'fr-004',
    title: 'Python Data Analysis Script',
    description: 'Looking for a Python developer to create data analysis scripts for processing large datasets.',
    platform: Platform.FREELANCER,
    skillsRequired: ['Python', 'Pandas', 'Data Analysis'],
    url: 'https://freelancer.com/jobs/python-data',
    postedDate: '2024-01-12',
    location: 'Remote',
    budget: '$500 - $1,000',
    duration: '1 week',
    match: 76
  }
];

export const mockApplications = [
  {
    id: 'app-1',
    userId: 'user123',
    gigId: 'gig-1',
    applicationDate: '2024-01-15',
    status: GigStatus.APPLIED,
    notes: 'Submitted proposal with portfolio examples',
    url: 'https://upwork.com/proposals/123'
  },
  {
    id: 'app-2',
    userId: 'user123',
    gigId: 'gig-2',
    applicationDate: '2024-01-14',
    status: GigStatus.INTERVIEWING,
    notes: 'Phone interview scheduled for tomorrow',
    url: 'https://fiverr.com/messages/456'
  },
  {
    id: 'app-3',
    userId: 'user123',
    gigId: 'old-gig-1',
    applicationDate: '2024-01-10',
    status: GigStatus.HIRED,
    notes: 'Contract signed! Starting next week',
    url: 'https://upwork.com/contracts/789'
  },
  {
    id: 'app-4',
    userId: 'user123',
    gigId: 'old-gig-2',
    applicationDate: '2024-01-08',
    status: GigStatus.REJECTED,
    notes: 'Client went with another freelancer',
    url: null
  }
];
# GigFlow - Your Streamlined Path to Freelance Success

GigFlow is a Base MiniApp that matches freelancers with gigs based on skills and availability, automating the discovery and application process.

## 🚀 Features

### Core Features
- **Automated Gig Alerts**: Real-time notifications when new gigs match your skills and preferences
- **Skill-Based Gig Matching**: Intelligent matching algorithm that analyzes your skills against gig requirements
- **Gig Application Tracker**: Centralized dashboard to track all applications and their status
- **Profile Management**: Comprehensive profile setup with skills, preferences, and notification settings
- **Real-time Updates**: WebSocket-powered live updates for new gigs and application status changes

### Technical Features
- **Base MiniApp Integration**: Built for the Base ecosystem with Farcaster authentication
- **Professional UI/UX**: Modern design system with Tailwind CSS and responsive layout
- **Error Handling**: Comprehensive error boundaries and loading states
- **Notification System**: Toast notifications for better user experience
- **API Integration**: Service layer architecture for external job board APIs
- **Production Ready**: Optimized build configuration and deployment pipeline

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **UI Components**: Lucide React, Headless UI
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios
- **Web3**: Coinbase OnchainKit, Wagmi, Viem
- **Deployment**: Vercel, GitHub Actions

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/vistara-apps/-app-development-6204.git
cd -app-development-6204
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Base MiniApp Configuration
VITE_BASE_CHAIN_ID=8453
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# API Configuration
VITE_API_BASE_URL=https://api.gigflow.app
VITE_WEBSOCKET_URL=wss://ws.gigflow.app

# Feature Flags
VITE_ENABLE_REAL_TIME_ALERTS=true
VITE_ENABLE_PAYMENTS=true
VITE_ENABLE_NOTIFICATIONS=true
```

5. Start the development server:
```bash
npm run dev
```

## 🏗 Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── AppShell.jsx    # Main app layout
│   ├── Dashboard.jsx   # Dashboard view
│   ├── GigFeed.jsx     # Gig browsing
│   ├── ApplicationTracker.jsx
│   ├── ProfileForm.jsx
│   ├── Settings.jsx
│   ├── ErrorBoundary.jsx
│   ├── LoadingSpinner.jsx
│   ├── SkeletonLoader.jsx
│   └── NotificationSystem.jsx
├── services/           # API and business logic
│   ├── api.js         # HTTP client configuration
│   ├── gigService.js  # Gig-related operations
│   └── websocketService.js # Real-time connections
├── hooks/             # Custom React hooks
│   ├── useNotifications.js
│   └── useRealTimeGigs.js
├── config/            # Configuration
│   └── environment.js
├── data/              # Mock data and types
│   └── mockData.js
└── types/             # Type definitions
    └── index.js
```

### Key Services

#### GigService
- Handles gig fetching, searching, and matching
- Implements intelligent matching algorithm
- Provides caching and fallback mechanisms

#### WebSocketService
- Manages real-time connections
- Handles reconnection logic
- Provides event-based communication

#### API Service
- Centralized HTTP client with interceptors
- Error handling and authentication
- Structured endpoints for different resources

## 🎯 Business Model

**Type**: Micro-transactions
**Pricing**: Freemium model with optional premium features
- Basic gig alerts: Free
- Advanced filtering: $1-5 per month
- Priority matching: Premium feature
- Auto-apply functionality: Premium feature

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BASE_CHAIN_ID` | Base blockchain chain ID | Yes |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `VITE_API_BASE_URL` | Backend API URL | No |
| `VITE_WEBSOCKET_URL` | WebSocket server URL | No |
| `VITE_ENABLE_REAL_TIME_ALERTS` | Enable real-time features | No |
| `VITE_ENABLE_PAYMENTS` | Enable payment features | No |
| `VITE_ENABLE_NOTIFICATIONS` | Enable notifications | No |

### Feature Flags

The app uses feature flags to enable/disable functionality:
- Real-time alerts can be disabled for development
- Payment features can be toggled
- Notifications can be controlled

## 🚀 Deployment

### Automatic Deployment
The app is configured for automatic deployment to Vercel via GitHub Actions:

1. Push to `main` branch triggers production deployment
2. Pull requests create preview deployments
3. Environment variables are injected during build

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

### Docker Deployment
```bash
docker build -t gigflow .
docker run -p 3000:3000 gigflow
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linting (if configured)
- `npm test` - Run tests (if configured)

### Development Features
- Hot module replacement
- Error boundaries with detailed error information
- Debug mode with console logging
- Mock data fallbacks for offline development

## 📱 Usage

### For Freelancers

1. **Setup Profile**: Add your skills and preferences
2. **Browse Gigs**: View matched opportunities with scoring
3. **Apply to Gigs**: One-click application with tracking
4. **Track Progress**: Monitor application status
5. **Get Alerts**: Receive real-time notifications for new matches

### Key Workflows

#### Onboarding
1. Connect Farcaster account
2. Set up skills and preferences
3. Configure notification settings
4. Start receiving gig matches

#### Daily Usage
1. Check dashboard for new high-match gigs
2. Review and apply to relevant opportunities
3. Track application progress
4. Update profile as needed

## 🔒 Security

- Environment variable validation
- Error boundary protection
- Secure API communication
- Input sanitization
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the error logs in the browser console

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core gig matching and application tracking
- ✅ Real-time notifications
- ✅ Professional UI/UX
- ✅ Base MiniApp integration foundation

### Phase 2 (Next)
- [ ] Payment integration for premium features
- [ ] Advanced matching algorithms with ML
- [ ] External job board API integrations
- [ ] Mobile app development

### Phase 3 (Future)
- [ ] AI-powered application optimization
- [ ] Freelancer portfolio integration
- [ ] Client-side features
- [ ] Advanced analytics and insights

---

Built with ❤️ for the freelance community on Base.

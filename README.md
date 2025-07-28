# VibeMeter - Live Talent Show Voting System

VibeMeter lets audiences vote live for their favorite contestants in real time during a talent show. With a sleek interface, responsive design, and live vote tracking, VibeMeter turns audience engagement into real-time results - every vote counts, and every vibe matters.

## 🎯 Features

### Core Functionality

- **Live Voting System**: Real-time voting for contestants during live talent shows
- **Vote Persistence**: localStorage-based vote state that persists across page reloads
- **Duplicate Prevention**: Prevents users from voting multiple times for the same contestant
- **Real-time Updates**: Live vote count updates every 5 seconds
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### Technical Features

- **Custom Hooks**: Reusable hooks for contestant voting logic and live data management
- **Error Boundaries**: Graceful error handling with fallback UIs
- **TypeScript**: Full type safety throughout the application
- **Testing**: Comprehensive test coverage including localStorage persistence tests
- **Performance**: Optimized rendering and state management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd VibeMeter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Key Test Features

- **Vote Button Tests**: Tests for different button states (voted, submitting, disabled)
- **localStorage Persistence**: Ensures vote state persists across page reloads
- **Hook Testing**: Comprehensive testing of custom hooks
- **Error Handling**: Tests for network errors and edge cases

## 📁 Project Structure

```
VibeMeter/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with error boundaries
│   ├── page.tsx           # Main voting interface
│   └── globals.css        # Global styles with Tailwind
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   │   └── LoadingSpinner.tsx
│   ├── ContestantCard.tsx
│   ├── VoteButton.tsx
│   └── ErrorBoundary.tsx
├── hooks/                # Custom hooks
│   ├── useContestantVoting.ts
│   ├── useLiveData.ts
│   └── useLocalStorage.ts
├── types/                # TypeScript definitions
│   └── index.ts
├── utils/                # Utility functions
│   ├── api.ts           # Simulated API calls
│   └── storage.ts       # localStorage utilities
├── tests/                # Test files
│   ├── VoteButton.test.tsx
│   ├── useContestantVoting.test.tsx
│   └── localStorage.test.tsx
└── public/               # Static assets
```

## 🎨 Design Patterns

### 1. Custom Hooks Pattern

- **useContestantVoting**: Manages voting logic per contestant
- **useLiveData**: Handles real-time data fetching with polling
- **useLocalStorage**: Manages localStorage persistence

### 2. Error Boundary Pattern

- Catches JavaScript errors anywhere in the component tree
- Displays fallback UI when errors occur
- Prevents entire app from crashing

### 3. Responsive Design Pattern

- Mobile-first approach with CSS Grid
- Breakpoint-specific layouts
- Touch-friendly interface

### 4. State Management Pattern

- Isolated state per contestant
- localStorage for persistence
- Optimistic updates with error handling

## 🔧 Technical Implementation

### Real-time Updates

- Polling mechanism every 5 seconds
- Simulated API with random vote increases
- Graceful error handling for network issues

### Vote Validation

- Prevents duplicate votes using localStorage
- Disables vote button after voting
- Persists vote state across page reloads

### Responsive Layout

- CSS Grid with responsive breakpoints
- Mobile-first design approach
- Touch-friendly buttons and interactions

### Error Handling

- Network error fallbacks
- localStorage error handling
- User-friendly error messages

## 🎯 Business Logic

### Voting Rules

1. Users can only vote once per contestant
2. Vote state persists across browser sessions
3. Real-time vote count updates
4. Voting window can be enabled/disabled

### Data Flow

1. App loads with initial contestant data
2. Live data polling updates vote counts
3. User clicks vote button
4. Vote is validated and submitted
5. localStorage is updated with vote state
6. UI reflects new vote status

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 📝 Development Notes

### Key Prompts Used

1. **Architecture Planning**: "Create a comprehensive plan for America's Got Talent-style voting system"
2. **Custom Hooks**: "Implement reusable custom hooks for contestant voting logic"
3. **Error Boundaries**: "Create error boundaries to catch and display fallback UIs"
4. **Responsive Design**: "Design responsive layout for mobile, tablet, and desktop"
5. **Testing**: "Create tests for localStorage persistence and vote button states"

### Best Practices Implemented

- **Separation of Concerns**: Clear separation between UI, logic, and data layers
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Performance**: Optimized rendering and state updates
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Testing**: Comprehensive test coverage with real-world scenarios

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

# VibeMeter - Live Talent Show Voting System

A beautiful, responsive live voting system for America's Got Talent-style shows built with React, Next.js, and TypeScript.

## Features

- 🎯 **Live Voting**: Real-time voting with limited votes per user
- 🎨 **Beautiful UI**: Modern design with gradients and animations
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop
- ⚡ **Real-time Updates**: Live data polling every 5 seconds
- 🧪 **Comprehensive Testing**: Unit tests for all components
- 🎭 **Error Handling**: Graceful error boundaries and loading states
- 💾 **Local Storage**: Persistent vote state management
- 🔧 **Code Quality**: Prettier, ESLint, and Husky pre-commit hooks

## Tech Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS v4, Shadcn/UI components
- **Testing**: Jest, React Testing Library
- **Code Quality**: Prettier, ESLint, Husky, lint-staged
- **State Management**: Custom React hooks
- **Build Tool**: Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd VibeMeter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
VibeMeter/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Shadcn/UI components
│   └── ...                # Custom components
├── hooks/                 # Custom React hooks
├── tests/                 # Unit tests
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── .husky/               # Git hooks (Husky)
├── .cursor/              # Project documentation
└── ...                   # Configuration files
```

## Key Components

### 🎯 **VoteButton**

Interactive voting button with multiple states (normal, submitting, voted, disabled).

### 🃏 **ContestantCard**

Beautiful card displaying contestant information with vote count and voting interface.

### 📊 **useContestantVoting**

Custom hook managing individual contestant voting logic and state.

### 🌐 **useLiveData**

Custom hook for fetching and updating live data with polling mechanism.

### 💾 **useLocalStorage**

Custom hook for managing localStorage persistence of voting state.

## Testing

The project includes comprehensive unit tests:

- **VoteButton Tests**: ✅ All passing (8/8)
- **useContestantVoting Tests**: ⚠️ 4 failing (hook implementation)
- **localStorage Tests**: ⚠️ 1 failing (storage implementation)

Run tests with:

```bash
npm test
```

## Code Quality

### Prettier Configuration

- **Formatting**: Consistent code style across the project
- **Configuration**: `.prettierrc` with optimal React/TypeScript settings
- **Ignore**: `.prettierignore` excludes build files and dependencies

### ESLint Integration

- **Next.js Compatible**: Uses Next.js ESLint configuration
- **Prettier Plugin**: ESLint works seamlessly with Prettier
- **Custom Rules**: Appropriate warnings and disabled problematic rules

### Husky Pre-commit Hooks

- **Pre-commit**: Runs lint-staged for formatting and linting
- **Commit-msg**: Enforces conventional commit format
- **Automated**: Ensures code quality before every commit

### Conventional Commits

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(voting): add vote button component
```

## Design Features

### 🎨 **Visual Design**

- **Gradient Backgrounds**: Purple-to-pink-to-orange gradients
- **Glass Morphism**: Header with backdrop blur effects
- **Card Animations**: Hover effects with scale transforms
- **Floating Particles**: Animated particles in contestant cards
- **Heart Beat Animation**: Pulsing heart icons
- **Glow Effects**: Subtle glow effects on avatars

### 📱 **Responsive Design**

- **Mobile-First**: All components start with mobile design
- **Breakpoint System**: sm: (640px+), md: (768px+), lg: (1024px+)
- **Flexible Grid**: 1 column mobile, 2 tablet, 3 desktop
- **Typography Scaling**: Text sizes adapt to screen size
- **Touch-Friendly**: Larger buttons and touch targets

## Development Workflow

1. **Code Changes**: Make your changes
2. **Pre-commit**: Husky automatically runs lint-staged
3. **Formatting**: Prettier formats your code
4. **Linting**: ESLint checks for issues
5. **Commit**: Conventional commit format enforced
6. **Quality**: Code is consistently formatted and linted

## Deployment

The application is ready for deployment to any platform that supports Next.js:

- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Format code: `npm run format`
6. Commit with conventional format
7. Submit a pull request

## License

This project is licensed under the MIT License.

---

**VibeMeter** - Making talent shows more interactive and engaging! 🎭✨

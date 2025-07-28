import '@testing-library/jest-dom';

// Mock localStorage with spy functions
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Replace the global localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Also mock for Node.js environment
if (typeof global !== 'undefined') {
  global.localStorage = localStorageMock;
}

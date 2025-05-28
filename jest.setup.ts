import '@testing-library/jest-dom';

// jest.setup.ts

// Мокаем window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Мокаем setPointerCapture
if (!HTMLElement.prototype.setPointerCapture)
  HTMLElement.prototype.setPointerCapture = jest.fn();

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  writable: true,
  value: jest.fn(),
});

// Мокаем ResizeObserver
class ResizeObserver {
  // eslint-disable-next-line
  observe() {}
  // eslint-disable-next-line
  unobserve() {}
  // eslint-disable-next-line
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
global.DOMRect = {
  fromRect: () => ({}),
} as any;

// 🔁 Добавь scrollIntoView
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  writable: true,
  value: jest.fn(), // или () => {} если нужен конкретный тип
});

import '@testing-library/jest-dom'

// Mock canvas for jsdom
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  drawImage: jest.fn(),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/jpeg;base64,') as unknown as typeof HTMLCanvasElement.prototype.toDataURL;

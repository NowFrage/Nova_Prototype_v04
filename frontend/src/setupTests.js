import '@testing-library/jest-dom';

// Mock de scrollIntoView qui n'est pas implémenté dans jsdom
window.HTMLElement.prototype.scrollIntoView = jest.fn();
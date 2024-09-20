import '@testing-library/jest-dom';
// src/setupTests.js
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(), // mock the addListener function
      removeListener: jest.fn(), // mock the removeListener function
    };
  };


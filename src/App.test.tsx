import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// teardown and cleanup
afterEach(() => {
  jest.clearAllMocks();
});

window.scrollTo = jest.fn();

test('Renders loading text', () => {
  render(<App />);
  const el = screen.getByText(/LOADING DATA/i);
  expect(el).toBeInTheDocument();
});

test('Renders heading text', () => {
  render(<App />);
  const el = screen.getByText(/Compare your Air/i);
  expect(el).toBeInTheDocument();
});

test('Renders subheading text', () => {
  render(<App />);
  const el = screen.getByText(/Compare the air quality between cities in the UK/i);
  expect(el).toBeInTheDocument();
});

test('Renders to top of page button and tests click', () => {
  render(<App />);
  const el = screen.getByText(/TOP/i);

  expect(el).toBeInTheDocument();

  el.onclick = jest.fn();
  expect(el.onclick).not.toHaveBeenCalled();
  el.click();
  expect(el.onclick).toHaveBeenCalled();
});

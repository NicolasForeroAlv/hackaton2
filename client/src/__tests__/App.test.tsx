import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';


describe('App component', () => {
  it('renders dashboard link', () => {
    render(<App />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './components/Home/Home';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Home with a navbar', () => {
  render(<Home />);
  const element = screen.getByText(/View All/i);
  expect(element).toBeInTheDocument();
});

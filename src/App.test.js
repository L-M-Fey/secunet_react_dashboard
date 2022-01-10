import { render, screen } from '@testing-library/react';
import App from './App';

test('renders left menu elements', () => {
  const { container } = render(<App />);
  const textElement = screen.getByText(/Module/i);
  const menuPlates = container.getElementsByClassName('menuPlate');
  expect(textElement).toBeInTheDocument();
  expect(menuPlates.length).toBeGreaterThanOrEqual(3);
});

test('renders panels', () => {
  const { container } = render(<App />);
  const panels = container.getElementsByClassName('panel');
  expect(panels.length).toBeGreaterThanOrEqual(3);
});
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// PUBLIC_INTERFACE
test('renders player indicators and initial state', () => {
  render(<App />);
  expect(screen.getByText(/player 1 \(x\)/i)).toBeInTheDocument();
  expect(screen.getByText(/player 2 \(o\)/i)).toBeInTheDocument();
  expect(screen.getByText(/next: player 1/i)).toBeInTheDocument();
});

// PUBLIC_INTERFACE
test('allows two players to play and shows winner', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });

  // Make winning moves for X
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[3]); // O
  fireEvent.click(cells[1]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[2]); // X wins

  expect(screen.getByText(/winner: player 1/i)).toBeInTheDocument();
  // Winning cells are highlighted
  expect(cells[0].className).toMatch(/highlight/);
  expect(cells[1].className).toMatch(/highlight/);
  expect(cells[2].className).toMatch(/highlight/);
});

// PUBLIC_INTERFACE
test('detects a draw game', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });
  // Draw board
  const moves = [0,1,2,4,3,5,7,6,8];
  moves.forEach((idx,i) => {
    fireEvent.click(cells[idx]);
  });
  expect(screen.getByText(/it's a draw/i)).toBeInTheDocument();
});

// PUBLIC_INTERFACE
test('restart button resets the board', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /cell/i });
  fireEvent.click(cells[0]);
  fireEvent.click(cells[1]);
  // Restart
  fireEvent.click(screen.getByText(/restart/i));
  expect(cells[0].textContent).toBe('');
  expect(cells[1].textContent).toBe('');
  expect(screen.getByText(/next: player 1/i)).toBeInTheDocument();
});

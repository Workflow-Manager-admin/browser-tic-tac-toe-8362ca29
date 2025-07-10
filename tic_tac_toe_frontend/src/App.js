import React, { useState, useEffect } from 'react';
import './App.css';

/*
  COLORS (from request):
    --primary:   #1976d2
    --secondary: #ffffff
    --accent:    #ff9800
*/

/** Cell component for the Tic Tac Toe board */
function Cell({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-cell${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

// Returns the winner ('X' or 'O') and the winning line indexes; or null if no winner.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

/** Main App component */
// PUBLIC_INTERFACE
function App() {
  // State for the 3x3 board (array of 9 elements)
  const [squares, setSquares] = useState(Array(9).fill(null));
  // State to track turn: true = X, false = O
  const [xIsNext, setXIsNext] = useState(true);
  // State for winner/Line
  const winnerObj = calculateWinner(squares);
  const winner = winnerObj?.winner;
  const winningLine = winnerObj?.line;
  // State: is draw
  const isDraw = !winner && squares.every(Boolean);

  // Reset game
  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // Handle Cell click
  // PUBLIC_INTERFACE
  const handleCellClick = idx => {
    if (winner || squares[idx]) return;
    const next = squares.slice();
    next[idx] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  // Status message
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)'}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next: ${xIsNext ? 'Player 1 (X)' : 'Player 2 (O)'}`;
  }

  // Set light theme always (per requirements)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <div className="App ttt-bg">
      <main className="ttt-container">
        {/* Player Indicators */}
        <div className="ttt-players">
          <span
            className={`ttt-player-label${xIsNext && !winner && !isDraw ? ' active' : ''}`}
            style={{ color: '#1976d2' }}
          >
            ● Player 1 (X)
          </span>
          <span className={`ttt-vs`}>vs</span>
          <span
            className={`ttt-player-label${!xIsNext && !winner && !isDraw ? ' active' : ''}`}
            style={{ color: '#ff9800' }}
          >
            ● Player 2 (O)
          </span>
        </div>

        {/* Board */}
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {[0, 1, 2].map(row =>
            <div className="ttt-row" key={row} role="row">
              {[0, 1, 2].map(col => {
                const idx = row * 3 + col;
                const highlight = winner && winningLine?.includes(idx);
                return (
                  <Cell
                    key={idx}
                    value={squares[idx]}
                    onClick={() => handleCellClick(idx)}
                    highlight={highlight}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Status & Restart */}
        <div className="ttt-status">{status}</div>
        <button className="ttt-restart" onClick={handleRestart}>
          Restart
        </button>
      </main>
      <footer className="ttt-footer">
        <span>
          <a
            href="https://reactjs.org/"
            rel="noopener noreferrer"
            target="_blank"
            className="ttt-link"
          >
            Built with React
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;

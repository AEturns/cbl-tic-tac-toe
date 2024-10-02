import React, { useState, useEffect } from 'react';
import './App.css';  // For basic styling
import XImage from './images/x.png';  // Import X image
import OImage from './images/o.png';  // Import O image

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));  // 9 squares, initially null
  const [playerIsNext, setPlayerIsNext] = useState(true);  // Track if it's the player's turn

  useEffect(() => {
    if (!playerIsNext) {
      const timeout = setTimeout(() => {
        makeComputerMove();
      }, 500); // Computer plays after 0.5 seconds
      return () => clearTimeout(timeout);
    }
  }, [playerIsNext]);  // Only run this effect when it's the computer's turn

  const handleClick = (index) => {
    // If someone has won or the square is already filled, return early
    if (calculateWinner(squares) || squares[index] || !playerIsNext) return;

    const newSquares = squares.slice();
    newSquares[index] = 'X';  // Player always plays as 'X'
    setSquares(newSquares);
    setPlayerIsNext(false);  // Switch to computer's turn
  };

  const makeComputerMove = () => {
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter(index => index !== null);

    if (emptySquares.length === 0 || calculateWinner(squares)) {
      return;  // No moves left or game is already won
    }

    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newSquares = squares.slice();
    newSquares[randomIndex] = 'O';  // Computer plays as 'O'
    setSquares(newSquares);
    setPlayerIsNext(true);  // Switch back to player's turn
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {squares[index] && <img src={squares[index] === 'X' ? XImage : OImage} alt={squares[index]} className="icon"/>}
      </button>
    );
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = winner === 'X' ? 'Winner: Lemmon Puff' : 'Winner: Choclate Puff';  // Custom winner messages
  } else {
    status = `Next player: ${playerIsNext ? 'Player (Lemmon Puff)' : 'Computer (Choclate Puff)'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
};

// Helper function to determine the winner
const calculateWinner = (squares) => {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;

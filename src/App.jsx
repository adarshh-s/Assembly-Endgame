import { useState } from 'react';
import { languages } from './languages';
import clsx from 'clsx';

export default function App() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessLetters, setGuessLetters] = useState([]);

  const wrongGuessCount = guessLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  function chooseLetter(letter) {
    setGuessLetters((prev) => {
      return prev.includes(letter) ? prev : [...prev, letter];
    });
  }
  const keyboard = alphabet.split('').map((key) => {
    const isGuessed = guessLetters.includes(key);
    const isCorrect = isGuessed && currentWord.includes(key);
    const isWrong = isGuessed && !currentWord.includes(key);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button key={key} onClick={() => chooseLetter(key)} className={className}>
        {key.toUpperCase()}
      </button>
    );
  });

  const word = currentWord.split('').map((letter, index) => {
    return (
      <span key={index}>
        {guessLetters.includes(letter) ? letter.toUpperCase() : ''}
      </span>
    );
  });

  const language = languages.map((language, index) => {
    const isLost = index < wrongGuessCount;
    return (
      <span
        key={index}
        className={clsx('chip', { lost: isLost })}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });
  const isGameWon = currentWord
    .split('')
    .every((letter) => guessLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const gameStatusClass = clsx('status-section', {
    won: isGameWon,
    lost: isGameLost,
  });

  function renderGameStatus() {
    if (!isGameOver) {
      return null;
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>{renderGameStatus()}</section>
      <section className="languages">{language}</section>
      <section className="wordbox">{word}</section>
      <section className="keyboard">{keyboard}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}

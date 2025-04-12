import { useState } from 'react';
import { languages } from './languages';
import clsx from 'clsx';
import { getFarewellText, randomWord } from './utils';
import Confetti from 'react-confetti';

export default function App() {
  const [currentWord, setCurrentWord] = useState(() => randomWord());
  const [guessLetters, setGuessLetters] = useState([]);

  const wrongGuessCount = guessLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  const lastGuessedLetter = guessLetters[guessLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  const isGameWon = currentWord
    .split('')
    .every((letter) => guessLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const gameStatusClass = clsx('status-section', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

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
      <button
        key={key}
        onClick={() => chooseLetter(key)}
        className={className}
        disabled={isGuessed || isGameOver}
        aria-disabled={guessLetters.includes(key)}
        aria-label={`Letter ${key}`}
      >
        {key.toUpperCase()}
      </button>
    );
  });

  const word = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessLetters.includes(letter) && 'missed-letter',
    );
    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ''}
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

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  return (
    <main className={clsx('container', { shake: isGameLost })}>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
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
      {isGameOver && (
        <button
          className="new-game"
          onClick={() => {
            setGuessLetters([]), setCurrentWord(randomWord());
          }}
        >
          New Game
        </button>
      )}
    </main>
  );
}

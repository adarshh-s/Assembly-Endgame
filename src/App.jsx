import { useState } from 'react';
import { languages } from './languages';

export default function App() {
  const [currentWord, setCurrentWord] = useState('react');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const keyboard = alphabet.split('').map((key) => {
    return <button key={key}>{key.toUpperCase()}</button>;
  });

  const word = currentWord.split('').map((letter, index) => {
    return <span key={index}>{letter.toUpperCase()}</span>;
  });

  const language = languages.map((language, index) => {
    return (
      <span
        key={index}
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
      >
        {language.name}
      </span>
    );
  });
  return (
    <main className="container">
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="status-section">
        <h2>You Win!</h2>
        <p>Well done!🎉</p>
      </section>
      <section className="languages">{language}</section>
      <section className="wordbox">{word}</section>
      <section className="keyboard">{keyboard}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}

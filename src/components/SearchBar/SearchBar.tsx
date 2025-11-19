import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(trimmed);
    setInput(''); // очищення поля після сабміту
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

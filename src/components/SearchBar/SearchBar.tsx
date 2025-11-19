import { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (searchQuery: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [input, setInput] = useState('');

  const action = async (formData: FormData) => {
    const raw = formData.get('query');
    const trimmed =
      typeof raw === 'string' ? raw.trim() : raw ? String(raw).trim() : '';

    if (!trimmed) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(trimmed);
    setInput('');
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

        {}
        <form className={styles.form} action={action}>
          <input
            className={styles.input}
            name="query"
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

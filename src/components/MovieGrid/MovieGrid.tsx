import React from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';
import { getImageUrl } from '../../services/movieService';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (!movies.length) return null;

  return (
    <ul className={styles.grid}>
      {movies.map(movie => (
        <li key={movie.id}>
          <div
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(movie)}
            onKeyDown={e => {
              if (e.key === 'Enter') onSelect(movie);
            }}
          >
            <img
              className={styles.image}
              src={getImageUrl(movie.poster_path)}
              alt={movie.title || 'Movie poster'}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title || 'No title'}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;

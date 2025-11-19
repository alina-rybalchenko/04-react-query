import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../services/movieService';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const imageUrl = movie.backdrop_path
    ? getImageUrl(movie.backdrop_path, 'w500')
    : movie.poster_path
    ? getImageUrl(movie.poster_path, 'w500')
    : null;

  const modalContent = (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={movie.title || 'Movie backdrop'}
            className={styles.image}
          />
        )}

        <div className={styles.content}>
          <h2>{movie.title || 'No title'}</h2>
          <p>{movie.overview || 'No description available.'}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || 'N/A'}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average ?? 'N/A'}/10
          </p>
        </div>
      </div>
    </div>
  );

  const portalRoot = document.getElementById('modal-root') ?? document.body;
  return ReactDOM.createPortal(modalContent, portalRoot);
};

export default MovieModal;

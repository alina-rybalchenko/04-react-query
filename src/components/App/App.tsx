import React, { useState, useMemo, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies, type TMDBResponse } from '../../services/movieService';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-hot-toast';
import styles from './App.module.css';
import type { Movie } from '../../types/movie';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const queryResult = useQuery<TMDBResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: !!query,
  });

  const { data, isLoading, isError } = queryResult;
  const movies = useMemo(() => data?.results ?? [], [data]);
  const totalPages = data?.total_pages ?? 0;

  // Показуємо повідомлення "No movies found..." лише після того, як користувач фактично шукав
  useEffect(() => {
    if (!hasSearched) return;
    if (data && data.results.length === 0) {
      toast.error('No movies found for your search.');
    }
  }, [data, hasSearched]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setHasSearched(true);
  };

  const handleSelect = (movie: Movie) => setSelected(movie);
  const handleCloseModal = () => setSelected(null);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <div style={{ minHeight: '400px' }}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {!isLoading && !isError && (
          <>
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}

            <MovieGrid movies={movies} onSelect={handleSelect} />

            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}
      </div>

      {selected && <MovieModal movie={selected} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;

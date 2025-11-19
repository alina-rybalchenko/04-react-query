import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export interface TMDBResponse {
  results: Movie[];
  total_pages: number;
  // Додатково можна додати:
  page?: number;
  total_results?: number;
}

interface FetchMoviesParams {
  query: string;
  page?: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<TMDBResponse> {
  if (!query.trim()) {
    return { results: [], total_pages: 0 };
  }

  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (!token) throw new Error('TMDB token is missing');

  try {
    const response = await axios.get<TMDBResponse>(BASE_URL, {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      results: response.data.results ?? [],
      total_pages: response.data.total_pages ?? 0,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export function getImageUrl(
  path: string | null,
  size: 'w500' | 'original' = 'w500'
): string {
  return path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : '/placeholder.jpg';
}

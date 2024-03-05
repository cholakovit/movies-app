import { useQuery } from '@tanstack/react-query';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMovieData = async (title: string) => {
  await delay(2000); // Simulate network delay

  const abortoController = new AbortController()
  const signal = abortoController.signal

  const response = await fetch(`${process.env.REACT_APP_TMDB_URL}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(title)}`, { signal });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
        const movie = data.results[0];
        if (!movie) {
          throw new Error(`No results for "${title}"`);
        }
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          actors: [], 
          genres: movie.genre_ids, 
          poster: `${process.env.REACT_APP_TMDB_IMAGE_URL}${movie.poster_path}`,
          release: movie.release_date,
          rating: movie.vote_average,
          trailer: '', 
          director: '', 
          duration: movie.runtime 
        };
};

export const useMovieSearch = (title: string) => {
  return useQuery({
    queryKey: ['movieData', title],
    queryFn: () => fetchMovieData(title),
    enabled: !!title, // This ensures the query only runs if the title is truthy
  });
};
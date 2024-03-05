import { useEffect, useMemo, useState } from "react";
import { AlertWithTimeoutHookProps, ColorModeContextType, Movie, MovieData } from "../../types";
import { useWeatherTheme } from "./weatherTheme";
import { PaletteMode } from "@mui/material";
import { DARK, LIGHT } from "./constants";
import { useQueryClient } from "@tanstack/react-query";

export const useAlertWithTimeout = ({ initialAlert, timeout }: AlertWithTimeoutHookProps): string | null => {
  const [alert, setAlert] = useState<string | null>(initialAlert);

  useEffect(() => {
    setAlert(initialAlert);

    const timer = setTimeout(() => {
      setAlert(null);
    }, timeout);

    return () => clearTimeout(timer);
  }, [initialAlert, timeout]);

  return alert;
};


export const useFileReader = () => {
  const queryClient = useQueryClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result?.toString().split('\n').filter(Boolean) || [];
      const movies = content.map((title, index) => ({ id: index + 1, title: title.trim(), checked: true }));
      // Use queryClient to set movies data in the cache
      queryClient.setQueryData(['movies'], movies);
    };
    reader.readAsText(file);
  };

  return { handleFileChange };
};

export const useMovieSearch = () => {
  const [movieData, setMovieData] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovieData = async (movieTitles: string[]) => {
      setLoading(true);
      setError('');
      try {
          const apiKey = process.env.REACT_APP_TMDB_API_KEY;
          const movieDataPromises = movieTitles.map(title =>
              fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`)
              .then(response => response.json())
              .then(data => {
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
                      poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                      release: movie.release_date,
                      rating: movie.vote_average,
                      trailer: '', 
                      director: '', 
                      duration: movie.runtime 
                  };
              })
          );
          const movies = await Promise.all(movieDataPromises);
          setMovieData(movies);
      } catch (err: any) {
          setError(err.message || 'An error occurred while fetching movie data.');
      } finally {
          setLoading(false);
      }
  };

  return { movieData, loading, error, fetchMovieData };
};

export const useHandleSearch = (movies: Movie[], fetchMovieData: (titles: string[]) => void) => {
  const handleSearch = () => {
      const titles = movies.filter(movie => movie.checked).map(movie => movie.title);
      fetchMovieData(titles);
  };

  return { handleSearch };
};

export const useSyncFilteredMovies = <T,>(movieData: T[]) => {
  const [filteredMovies, setFilteredMovies] = useState<T[]>(movieData);

  useEffect(() => {
      setFilteredMovies(movieData);
  }, [movieData]);

  return { filteredMovies, setFilteredMovies };
};

export const useDynamicTheme = (): [ReturnType<typeof useWeatherTheme>, ColorModeContextType] => {
  const [mode, setMode] = useState<PaletteMode>(DARK);
  const colorMode: ColorModeContextType = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === LIGHT ? DARK : LIGHT));
      },
    }),
    []
  );

  const theme = useWeatherTheme(mode);

  return [theme, colorMode];
};
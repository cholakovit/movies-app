import { useEffect, useMemo, useState } from "react";
import { AlertWithTimeoutHookProps, ColorModeContextType, Movie, MovieData } from "../../types";
import { useWeatherTheme } from "./weatherTheme";
import { PaletteMode } from "@mui/material";
import { DARK, LIGHT } from "./constants";
import { useQueryClient } from "@tanstack/react-query";
import { delay } from "./fn";

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
      const movieDataPromises = movieTitles.map(async (title) => {
        await delay(2000); // Wait for 2 seconds before each request
      
        const response = await fetch(`${process.env.REACT_APP_TMDB_URL}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(title)}`);
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
      });
        const movies = await Promise.all(movieDataPromises);
        setMovieData(movies);
    } catch (err: unknown) {
        setError((err instanceof Error && err.message) || 'An error occurred while fetching movie data.');
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

export const useHandleCheckboxChange = (movies: Movie[], selectedMovies: number[], setSelectedMovies: (value: React.SetStateAction<number[]>) => void) => {
  const queryClient = useQueryClient();

  const handleCheckboxChange = (movieId: number) => {
    setSelectedMovies((currentSelected) => {
      const newIndex = currentSelected.indexOf(movieId);
      const newSelected = newIndex === -1 
        ? [...currentSelected, movieId] 
        : currentSelected.filter((id) => id !== movieId);

      const finalizedMovies = movies.filter((movie) => newSelected.includes(movie.id));
      
      queryClient.setQueryData(['finalizedMovies'], finalizedMovies);

      return newSelected;
    });
  };

  return handleCheckboxChange;
};

export const useInitialSelectionAndFinalize = (movies: Movie[], setSelectedMovies: (movies: number[]) => void) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const initialSelected = movies.map(movie => movie.id);
    setSelectedMovies(initialSelected);

    queryClient.setQueryData(['finalizedMovies'], movies);
  }, [movies, queryClient, setSelectedMovies]);
};
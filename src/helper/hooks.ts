import { useEffect, useMemo, useState } from "react";
import { AlertWithTimeoutHookProps, ColorModeContextType, Movie } from "../../types";
import { useWeatherTheme } from "./weatherTheme";
import { PaletteMode } from "@mui/material";
import { DARK, LIGHT } from "./constants";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { fetchMovieData } from "./fn";

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

export const useMoviesSearch = (movieTitles: string[] | undefined) => {
  const queryResults = useQueries({
    queries: movieTitles!.map(title => ({
      queryKey: ['movieData', title],
      queryFn: () => fetchMovieData(title),
      enabled: title.length > 0,
    })),
  });

  const isLoading = queryResults.some(result => result.isLoading);
  const errors = queryResults.map(result => result.error).filter(error => error);
  const movies = queryResults.map(result => result.data).filter(movie => movie);

  // Combine movie data, loading state, and any errors
  return { 
    movieData: movies,
    loading: isLoading,
    error: errors.length > 0 ? errors : null,
  };
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

      const finalizedMovies = movies.filter((movie: any) => newSelected.includes(movie.id));
      
      queryClient.setQueryData(['finalizedMovies'], finalizedMovies);

      return newSelected;
    });
  };

  return handleCheckboxChange;
};

export const useInitialSelectionAndFinalize = (movies: Movie[], setSelectedMovies: (movies: number[]) => void) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    //const initialSelected = movies.map(movie => movie.id);
    const initialSelected = movies.map(movie => movie.id).filter(id => id !== undefined) as number[];
    setSelectedMovies(initialSelected);

    queryClient.setQueryData(['finalizedMovies'], movies);
  }, [movies, queryClient, setSelectedMovies]);
};

export const useSearchTitles = (movies: Movie[]) => {
  const [searchTitles, setSearchTitles] = useState<string[] | undefined>([]);

  const handleSearch = () => {
    const titles = movies.filter(movie => movie.checked).map(movie => movie.title);
    setSearchTitles(titles);
  };

  return { searchTitles, handleSearch };
};
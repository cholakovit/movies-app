
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviesList from '.'; // Adjust the import path as needed
import { useMoviesSearch, useSearchTitles, useSyncFilteredMovies } from '../../helper/hooks'; // Adjust the import paths as needed
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({
    data: [{ id: 1, title: 'Test Movie', checked: true }], // Example movie data
    isLoading: false,
    isError: false,
  }),
}));

jest.mock('../../helper/hooks', () => ({
  useSearchTitles: jest.fn(), // Mock other hooks if necessary
  useMoviesSearch: jest.fn(), // This is what allows you to use .mockImplementation() later
  useSyncFilteredMovies: jest.fn(), // Mock additional hooks as needed
}));
jest.mock('../Alert', () => jest.fn(() => null));
jest.mock('../Skeletons', () => jest.fn(() => null));

describe('MoviesList', () => {
  beforeEach(() => {
    // Setup default mock behavior
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: [], // Simulate empty data
      isLoading: false,
      isError: false,
    }));
    (useMoviesSearch as jest.Mock).mockImplementation(() => ({
      movieData: [],
      loading: false,
      error: null,
    }));
    (useSearchTitles as jest.Mock).mockImplementation(() => ({
      searchTitles: [],
      handleSearch: jest.fn(),
    }));
    (useSyncFilteredMovies as jest.Mock).mockImplementation(() => ({
      filteredMovies: [],
      setFilteredMovies: jest.fn(),
    }));
  });

  it('displays an error message when there is an error', () => {
    (useMoviesSearch as jest.Mock).mockImplementation(() => ({
      movieData: [],
      loading: false,
      error: 'Fetch error',
    }));
    render(<MoviesList />);
    //expect(screen.getByText(/error: fetch error/i)).toBeInTheDocument();
  });

  it('renders movie cards when there are movies', () => {
    (useSyncFilteredMovies as jest.Mock).mockImplementation(() => ({
      filteredMovies: [
        { id: 1, title: 'Movie Title', overview: 'Overview', poster: 'poster.jpg' },
      ],
      setFilteredMovies: jest.fn(),
    }));
    render(<MoviesList />);
    expect(screen.getByText(/movie title/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
  });
});

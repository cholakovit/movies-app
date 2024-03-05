
// Creates a promise that resolves after a specified number of milliseconds.
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Asynchronously fetches and returns detailed data for a specified movie title from TMDB, incorporating a simulated delay and abortable fetch operation.
export const fetchMovieData = async (title: string) => {
  await delay(2000); // Simulate network delay

  const abortoController = new AbortController();
  const signal = abortoController.signal;

  const response = await fetch(
    `${process.env.REACT_APP_TMDB_URL}?api_key=${
      process.env.REACT_APP_TMDB_API_KEY
    }&query=${encodeURIComponent(title)}`,
    { signal }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
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
    trailer: "",
    director: "",
    duration: movie.runtime,
  };
};

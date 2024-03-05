import { useQuery } from "@tanstack/react-query";
import {
  useMoviesSearch,
  useSearchTitles,
  useSyncFilteredMovies,
} from "../../helper/hooks";

import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { MovieCard, MovieCardContainer, StyledSearchButton } from "./index.style";
import SearchIcon from "@mui/icons-material/Search";
import AlertMessage from "../Alert";
import Skeletons from "../Skeletons";

const MoviesList = () => {
  const { data: movies } = useQuery({
    queryKey: ["finalizedMovies"],
    queryFn: () => Promise.resolve(undefined),
    initialData: () => [],
    select: (data) => data ?? [],
    enabled: false,
  });
  const { searchTitles, handleSearch } = useSearchTitles(movies || []);

  const { movieData, loading, error } = useMoviesSearch(searchTitles);

  const { filteredMovies, setFilteredMovies } =
    useSyncFilteredMovies(movieData);

  const removeMovie = (id: number) => {
    setFilteredMovies(filteredMovies.filter((movie: any) => movie.id !== id));
  };

  return (
    <>
      {error ? (
        <AlertMessage
          alert={`Error: ${error}`}
          type="error"
        />
      ) : loading ? (
        <Skeletons width={330} height={600} number={filteredMovies.length} />
      ) : (
        <>
          {movies && movies.length > 0 && (
            <StyledSearchButton
              onClick={handleSearch}
              variant="contained"
              startIcon={<SearchIcon />}
            >
              Search
            </StyledSearchButton>
          )}
  
          <MovieCardContainer>
            {filteredMovies.map((movie: any, index) => (
              <MovieCard  key={index}>
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height="440"
                  src={movie.poster}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.overview}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => removeMovie(movie.id)}>
                    🗑️
                  </Button>
                </CardActions>
              </MovieCard>
            ))}
          </MovieCardContainer>
        </>
      )}
    </>
  );
};

export default MoviesList;
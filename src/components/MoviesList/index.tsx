import { useQuery } from "@tanstack/react-query";
import {
  useHandleSearch,
  useMovieSearch,
  useSyncFilteredMovies,
} from "../../helper/hooks";
import { MovieData } from "../../../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { StyledSearchButton } from "./index.style";
import SearchIcon from "@mui/icons-material/Search";

const MoviesList = () => {
  const { data: movies } = useQuery({
    queryKey: ["finalizedMovies"],
    queryFn: () => Promise.resolve(undefined),
    initialData: () => [],
    select: (data) => data ?? [],
    enabled: false,
  });

  console.log("MoviesList: ", movies);

  const { movieData, loading, error, fetchMovieData } = useMovieSearch();

  const { handleSearch } = useHandleSearch(movies, fetchMovieData);

  const { filteredMovies, setFilteredMovies } =
    useSyncFilteredMovies<MovieData>(movieData);

  const removeMovie = (id: number) => {
    setFilteredMovies(filteredMovies.filter((movie) => movie.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <StyledSearchButton
        onClick={handleSearch}
        variant="contained"
        startIcon={<SearchIcon />}
      >
        Search
      </StyledSearchButton>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {filteredMovies.map((movie, index) => (
          <Card sx={{ maxWidth: 345 }} key={index}>
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;

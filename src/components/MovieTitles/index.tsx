// React Elements
import { useState } from "react";

// Tanstack Query Elements
import { useQuery } from "@tanstack/react-query";

// MUI Elements
import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MovieTitles } from "./index.style";

// Types
import { Movie } from "../../../types";

// Hooks
import {
  useHandleCheckboxChange,
  useInitialSelectionAndFinalize,
} from "../../helper/hooks";

const Movies = () => {
  const { data: movies } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: () => Promise.resolve([]),
    initialData: () => [],
    select: (data) => data ?? [],
    enabled: false,
  });

  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);

  useInitialSelectionAndFinalize(movies || [], setSelectedMovies);
  const handleCheckboxChange = useHandleCheckboxChange(
    movies || [],
    selectedMovies,
    setSelectedMovies
  );

  return (
    <div>
      <MovieTitles>
        {movies.map((movie, index) => (
          <ListItem key={movie.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => handleCheckboxChange(movie.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedMovies.includes(movie.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${index}`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={`checkbox-list-label-${index}`}
                secondary={movie.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </MovieTitles>
    </div>
  );
};

export default Movies;

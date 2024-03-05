import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Movie } from '../../../types';

const Movies = () => {
  const queryClient = useQueryClient();

  const { data: movies } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: () => Promise.resolve([]),
    initialData: () => [],
    select: (data) => data ?? [],
    enabled: false,
  });

  // Initialize all movies as selected
  const [selectedMovies, setSelectedMovies] = useState<number[]>(movies.map(movie => movie.id));

  const handleCheckboxChange = (movieId: number) => {
    setSelectedMovies((currentSelected) => {
      const newIndex = currentSelected.indexOf(movieId);
      if (newIndex === -1) {
        return [...currentSelected, movieId];
      } else {
        return currentSelected.filter((id) => id !== movieId);
      }
    });
  };

  // Handler to finalize the selection
  const finalizeSelection = () => {
    const finalizedMovies = movies.filter((movie) => selectedMovies.includes(movie.id));
    console.log('Finalized Selection:', finalizedMovies);
    queryClient.setQueryData(['finalizedMovies'], finalizedMovies);
  };

  if (!movies || movies.length === 0) {
    return <div>No movies loaded</div>;
  }

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {movies.map((movie, index) => (
          <ListItem key={movie.id} disablePadding>
            <ListItemButton role={undefined} onClick={() => handleCheckboxChange(movie.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedMovies.includes(movie.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
                />
              </ListItemIcon>
              <ListItemText id={`checkbox-list-label-${index}`} secondary={movie.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button onClick={finalizeSelection} variant="contained" style={{ marginTop: '20px' }}>
        Finalize Selection
      </Button>
    </div>
  );
};

export default Movies;
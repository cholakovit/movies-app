import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
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

  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);

  useEffect(() => {
    const initialSelected = movies.map(movie => movie.id);
    setSelectedMovies(initialSelected);

    queryClient.setQueryData(['finalizedMovies'], movies);
  }, [movies, queryClient]);

  const handleCheckboxChange = (movieId: number) => {
    setSelectedMovies((currentSelected) => {
      const newIndex = currentSelected.indexOf(movieId);
      const newSelected = newIndex === -1 
        ? [...currentSelected, movieId] 
        : currentSelected.filter((id) => id !== movieId);

      const finalizedMovies = movies.filter((movie) => newSelected.includes(movie.id));
      console.log('Finalized Selection:', finalizedMovies);
      
      queryClient.setQueryData(['finalizedMovies'], finalizedMovies);

      return newSelected;
    });
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
    </div>
  );
};

export default Movies;
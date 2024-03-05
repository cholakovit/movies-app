// Styled Elements
import { styled } from '@mui/material/styles';

export const MoviesApp = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center', 
  textAlign: 'center',
  width: '100%',
  height: '100%',
  fontSize: '14px',
  backgroundColor: theme.palette.primary.main,
  margin: 0,
  padding: 0
}));

export const MoviesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start', 
  gap: '10px', 
  padding: '20px',
  width: '100%'
}));


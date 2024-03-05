import { List, styled } from "@mui/material";

export const MovieTitles = styled(List)(({ theme }) => ({
  width: '100%', 
  maxWidth: 360, 
  backgroundColor: theme.palette.primary.black
}));
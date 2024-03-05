import { Button, ButtonProps, Card, styled } from "@mui/material";

export const StyledSearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.primary.lighter,
  margin: '20px',
  backgroundColor: theme.palette.primary.black,
  '&:hover': {
    backgroundColor: theme.palette.primary.hoverBgButton,
  },
}));

export const MovieCardContainer = styled('div')(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  justifyContent: "center",
  width: "100%"
}));

export const MovieCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  backgroundColor: theme.palette.primary.black
}));
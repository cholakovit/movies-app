import { Button, ButtonProps, styled } from "@mui/material";

export const StyledSearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
  margin: '20px',
  backgroundColor: theme.palette.primary.black,
  '&:hover': {
    backgroundColor: theme.palette.primary.hoverBgButton,
  },
}));
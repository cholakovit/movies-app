// React Elements
import { FC } from "react";

// Components
import Header from "../components/Header";
import FileUpload from "../components/FileUpload";

// MUI Elements
import { MoviesApp, MoviesContainer } from "../index.style";
import { CssBaseline } from "@mui/material";

// Components
import Movies from "../components/MovieTitles";
import MoviesList from "../components/MoviesList";

export const Home: FC = () => {
  return (
    <MoviesApp>
      <CssBaseline />
      <Header />
      <MoviesContainer>
        <FileUpload />
        <Movies />
        <MoviesList />
      </MoviesContainer>
    </MoviesApp>
  );
};

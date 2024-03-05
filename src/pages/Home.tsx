import Header from "../components/Header";
import FileUpload from "../components/FileUpload";
import { MoviesApp, MoviesContainer } from "../index.style";
import { FC } from "react";
import Movies from "../components/MovieTitles";
import MoviesList from "../components/MoviesList";
import { CssBaseline } from "@mui/material";

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

import Header from '../components/Header'
import FileUpload from '../components/FileUpload'
import { MoviesApp, MoviesContainer } from '../index.style'
import { FC } from 'react'
import Movies from '../components/MovieTitles'
import MoviesList from '../components/MoviesList'
import { CssBaseline } from '@mui/material'


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
        {/* {error ? (
          <AlertMessage
            alert={`${GEOLOCATION_ERROR} ${(error as Error).message}`}
            type="error"
          />
        ) : isLoading ? (
          <Skeletons flag={1} width={250} height={120} number={1} />
        ) : (
          <>
            <CssBaseline />
            <Header />
            <Router>
              <Routes>
                <Route path="/" element={<WeatherForecast />} />
                <Route path="/details/:date" element={<DetailedWeather />} />
              </Routes>
            </Router>
          </>
        )} */}
    </MoviesApp>
  )
}

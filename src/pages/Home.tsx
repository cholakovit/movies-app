import Header from '../components/Header'
import FileUpload from '../components/FileUpload'
import { MoviesApp } from '../index.style'
import { FC } from 'react'

export const Home: FC = () => {
  return (
    <MoviesApp>
      <Header />
      <FileUpload />
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

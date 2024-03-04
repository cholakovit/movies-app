import { FC } from 'react';
import { FileUploadHolder } from './index.style';
import { useFileReader, useHandleSearch, useMovieSearch, useSyncFilteredMovies } from '../../helper/hooks';
import { MovieData } from '../../types';

const MoviesUploader: FC = () => {
  
  const { movies, handleFileChange } = useFileReader();

  const { movieData, loading, error, fetchMovieData } = useMovieSearch();

  const { filteredMovies, setFilteredMovies } = useSyncFilteredMovies<MovieData>(movieData);

  const { handleSearch } = useHandleSearch(movies, fetchMovieData);

  const removeMovie = (id: number) => {
      setFilteredMovies(filteredMovies.filter(movie => movie.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
        <FileUploadHolder>
          <input type="file" accept=".txt" onChange={handleFileChange} />
          <ul>
              {movies.map((movie, index) => (
                  <li key={index}>
                      <label>
                          <input
                              type="checkbox"
                              checked={movie.checked}
                          />
                          {movie.title}
                      </label>
                  </li>
              ))}
          </ul>

          <div>
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {filteredMovies.map((movie, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ marginRight: '20px' }}>
                        <img src={movie.poster} alt={movie.title} width={100} />
                    </div>
                    <div>
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => removeMovie(movie.id)}>
                        <span role="img" aria-label="bin">🗑️</span>
                    </div>
                </div>
            ))}
          </div>
        </FileUploadHolder>
    );
};

export default MoviesUploader;
























// import { FC } from 'react';
// import { FileUploadHolder } from './index.style';
// import { useFileReader, useHandleSearch, useMovieSearch, useSyncFilteredMovies } from '../../helper/hooks';
// import { MovieData } from '../../types';

// const MoviesUploader: FC = () => {
  
//   const { movies, handleFileChange } = useFileReader();

//   const { movieData, loading, error, fetchMovieData } = useMovieSearch();

//   const { filteredMovies, setFilteredMovies } = useSyncFilteredMovies<MovieData>(movieData);

//   const { handleSearch } = useHandleSearch(movies, fetchMovieData);

//   const removeMovie = (id: number) => {
//       setFilteredMovies(filteredMovies.filter(movie => movie.id !== id));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//     return (
//         <FileUploadHolder>
//             <input type="file" accept=".txt" onChange={handleFileChange} />
//             <ul>
//                 {movies.map((movie, index) => (
//                     <li key={index}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={movie.checked}
//                             />
//                             {movie.title}
//                         </label>
//                     </li>
//                 ))}
//             </ul>

//             <div>
//             {/* File upload input and movie list with checkboxes (from useFileReader) */}
//             <button onClick={handleSearch}>Search</button>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {filteredMovies.map((movie, index) => (
//                 <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                     <div style={{ marginRight: '20px' }}>
//                         <img src={movie.poster} alt={movie.title} width={100} />
//                     </div>
//                     <div>
//                         <h3>{movie.title}</h3>
//                         <p>{movie.overview}</p>
//                     </div>
//                     <div style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => removeMovie(movie.id)}>
//                         <span role="img" aria-label="bin">🗑️</span>
//                     </div>
//                 </div>
//             ))}
//         </div>
//         </FileUploadHolder>
//     );
// };

// export default MoviesUploader;
















// import React, { useState } from 'react';
// import { FileUploadHolder } from './index.style';

// interface Movie {
//     title: string;
//     checked: boolean;
// }

// interface MovieInfo {
//     id: number;
//     title: string;
//     overview: string;
//     poster_path: string;
//     release_date: string;
//     vote_average: number;
//     // Additional fields can be added as needed
// }

// const MoviesUploader: React.FC = () => {
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [fetchedMovies, setFetchedMovies] = useState<MovieInfo[]>([]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e: ProgressEvent<FileReader>) => {
//             const content = e.target?.result?.toString().split('\n').filter(Boolean) || [];
//             setMovies(content.map(title => ({ title, checked: true })));
//         };
//         reader.readAsText(file);
//     };

//     console.log('movies: ', movies)

//     const handleCheckboxChange = (index: number) => {
//         const newMovies = [...movies];
//         newMovies[index].checked = !newMovies[index].checked;
//         setMovies(newMovies);
//     };

//     // const fetchMovies = async () => {
//     //     const apiKey = process.env.REACT_APP_TMDB_API_KEY;
//     //     const urls = movies
//     //         .filter(movie => movie.checked)
//     //         .map(movie => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie.title)}`);
        
//     //     const movieInfos = [];
//     //     for (const url of urls) {
//     //         const response = await fetch(url);
//     //         const data = await response.json();
//     //         console.log('data: ', data)
//     //         if (data.results.length > 0) {
//     //             const movie = data.results[0]; // Assuming the first result is the most relevant
//     //             movieInfos.push(movie);
//     //         }
//     //     }
//     //     setFetchedMovies(movieInfos);
//     // };

//     // const removeMovie = (id: number) => {
//     //     setFetchedMovies(fetchedMovies.filter(movie => movie.id !== id));
//     // };

//     // const saveMovies = () => {
//     //     // For this example, we'll just log the movies to the console.
//     //     // In a real application, you would send this data to a backend endpoint.
//     //     console.log(JSON.stringify(fetchedMovies));
//     //     alert("Movies saved (check the console for the output)");
//     // };

//     return (
//         <FileUploadHolder>
//             <input type="file" accept=".txt" onChange={handleFileChange} />
//             <ul>
//                 {movies.map((movie, index) => (
//                     <li key={index}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={movie.checked}
//                                 onChange={() => handleCheckboxChange(index)}
//                             />
//                             {movie.title}
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//             {/* <button onClick={fetchMovies}>Search</button>
//             <div>
//                 {fetchedMovies.map(movie => (
//                     <div key={movie.id}>
//                         <h3>{movie.title}</h3>
//                         <p>{movie.overview}</p>
//                         <button onClick={() => removeMovie(movie.id)}>Bin</button>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={saveMovies}>Save</button> */}
//         </FileUploadHolder>
//     );
// };

// export default MoviesUploader;












// import React, { useState } from 'react';
// import { FileUploadHolder } from './index.style';

// interface Movie {
//     title: string;
//     checked: boolean;
// }

// interface MovieInfo {
//     id: number;
//     title: string;
//     overview: string;
//     poster_path: string;
//     release_date: string;
//     vote_average: number;
//     // Additional fields can be added as needed
// }

// const MoviesUploader: React.FC = () => {
//     const [movies, setMovies] = useState<Movie[]>([]);
//     const [fetchedMovies, setFetchedMovies] = useState<MovieInfo[]>([]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;
//         if (!file) return;

//         const reader = new FileReader();
//         reader.onload = (e: ProgressEvent<FileReader>) => {
//             const content = e.target?.result?.toString().split('\n').filter(Boolean) || [];
//             setMovies(content.map(title => ({ title, checked: true })));
//         };
//         reader.readAsText(file);
//     };

//     console.log('movies: ', movies)

//     const handleCheckboxChange = (index: number) => {
//         const newMovies = [...movies];
//         newMovies[index].checked = !newMovies[index].checked;
//         setMovies(newMovies);
//     };

//     const fetchMovies = async () => {
//         const apiKey = process.env.REACT_APP_TMDB_API_KEY;
//         const urls = movies
//             .filter(movie => movie.checked)
//             .map(movie => `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie.title)}`);
        
//         const movieInfos = [];
//         for (const url of urls) {
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log('data: ', data)
//             if (data.results.length > 0) {
//                 const movie = data.results[0]; // Assuming the first result is the most relevant
//                 movieInfos.push(movie);
//             }
//         }
//         setFetchedMovies(movieInfos);
//     };

//     const removeMovie = (id: number) => {
//         setFetchedMovies(fetchedMovies.filter(movie => movie.id !== id));
//     };

//     const saveMovies = () => {
//         // For this example, we'll just log the movies to the console.
//         // In a real application, you would send this data to a backend endpoint.
//         console.log(JSON.stringify(fetchedMovies));
//         alert("Movies saved (check the console for the output)");
//     };

//     return (
//         <FileUploadHolder>
//             <input type="file" accept=".txt" onChange={handleFileChange} />
//             <ul>
//                 {movies.map((movie, index) => (
//                     <li key={index}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={movie.checked}
//                                 onChange={() => handleCheckboxChange(index)}
//                             />
//                             {movie.title}
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//             <button onClick={fetchMovies}>Search</button>
//             <div>
//                 {fetchedMovies.map(movie => (
//                     <div key={movie.id}>
//                         <h3>{movie.title}</h3>
//                         <p>{movie.overview}</p>
//                         <button onClick={() => removeMovie(movie.id)}>Bin</button>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={saveMovies}>Save</button>
//         </FileUploadHolder>
//     );
// };

// export default MoviesUploader;








// import React, { useState } from 'react';
// import { FileUploadHolder } from './index.style';

// const FileUpload: React.FC = () => {
//     const [movieTitles, setMovieTitles] = useState<string[]>([]);
//     const [movieInfo, setMovieInfo] = useState<any[]>([]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files ? event.target.files[0] : null;

//         if (file && file.type === "text/plain") {
//             const reader = new FileReader();

//             reader.onload = (e: ProgressEvent<FileReader>) => {
//                 const text = e.target?.result;
//                 const titles = text ? text.toString().split('\n') : [];
//                 setMovieTitles(titles);
//             };

//             reader.readAsText(file);
//         } else {
//             alert("Please upload a .txt file.");
//             setMovieTitles([]);
//         }
//     };

//     const fetchMovieInfo = async () => {
//       const apiKey = process.env.REACT_APP_TMDB_API_KEY;
//       let info: any[] = [];
  
//       for (let title of movieTitles) {
//           try {

//               const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title.trim())}`);
//               if (!response.ok) {
//                   // If the response is not ok, log the error and continue with the next title
//                   console.error('There was an error with the request:', response.statusText);
//                   continue;
//               }
              
//               const data = await response.json();
  
//               // Check if data.results is defined and has at least one result
//               if (data.results && data.results.length > 0) {
//                   info.push(data.results[0]); // Assuming we're interested in the first result
//               } else {
//                   // Log if no results are found for a title
//                   console.log(`No results found for "${title}".`);
//               }
//           } catch (error) {
//               console.error('Error fetching movie information:', error);
//               // Handle any errors that occurred during the fetch operation
//           }
//       }
  
//       setMovieInfo(info);
//   };

//     return (
//         <FileUploadHolder>
//             <input type="file" accept=".txt" onChange={handleFileChange} />
//             <button onClick={fetchMovieInfo}>Search</button>
//             <div>
//                 <h3>Movie Titles:</h3>
//                 {movieTitles.map((title, index) => (
//                     <p key={index}>{title}</p>
//                 ))}
//                 <h3>Movie Information:</h3>
//                 {movieInfo.map((info, index) => (
//                     <div key={index}>
//                         <h4>{info.title}</h4>
//                         <p>{info.overview}</p>
//                     </div>
//                 ))}
//             </div>
//         </FileUploadHolder>
//     );
// };

// export default FileUpload;




// import React, { useState } from 'react';
// import { FileUploadHolder } from './index.style';

// const FileUpload: React.FC = () => {
//     const [movieTitles, setMovieTitles] = useState<string[]>([]);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files ? event.target.files[0] : null;

//       if (file && file.type === "text/plain") {
//         const reader = new FileReader();

//         reader.onload = (e: ProgressEvent<FileReader>) => {
//             const text = e.target?.result;
//             const titles = text ? text.toString().split('\n') : [];
//             setMovieTitles(titles);
//         };

//         reader.readAsText(file);
//       } else {
//         alert("Please upload a .txt file.");
//         setMovieTitles([]);
//       }
//     };

//     return (
//       <FileUploadHolder>
//           <input type="file" accept=".txt" onChange={handleFileChange} />
//           <div>
//               <h3>Movie Titles:</h3>
//               {movieTitles.map((title, index) => (
//                   <p key={index}>{title}</p>
//               ))}
//           </div>
//       </FileUploadHolder>
//     );
// };

// export default FileUpload;
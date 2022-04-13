import { useEffect, useState } from 'react';
import { MovieItem } from '../../models/models';
import { Link } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/v1/movies')
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.movies);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Chose a movie</h2>

          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

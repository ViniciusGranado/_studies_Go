import { useEffect, useState } from 'react';
import { MovieItem } from '../../models/models';
import { Link } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/v1/movies')
      .then((response) => {
        if (response.status !== 200) {
          const err = new Error();
          err.message = `Invalid response code: ${response.status}`;

          setError(err);
        }

        return response.json();
      })
      .then((json) => {
        setMovies(json.movies);
        setIsLoaded(true);
        setError(null);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
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
  );
};

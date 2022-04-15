import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MovieItem } from '../../models/models';

export const Genre = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/v1/genres/${id}`)
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
    }
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (movies === null) {
    return <p>No movies with this genre</p>;
  }

  return (
    <>
      <h2>Genre:</h2>

      <div className='list-group'>
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            className='list-group-item list-group-item-action'
            key={movie.id}
          >
            {movie.title}
          </Link>
        ))}
      </div>
    </>
  );
};

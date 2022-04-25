import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MoviesByGenre } from '../../models/models';

export const Genre = () => {
  const { id } = useParams();
  const [moviesByGenre, setMoviesByGenre] = useState<MoviesByGenre>();
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
          setMoviesByGenre(json.movies);
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

  return (
    <>
      <h2>Genre: {moviesByGenre?.genre_name}</h2>

      {moviesByGenre?.movies === null ? (
        <p>No movies with this genre</p>
      ) : (
        <div className='list-group'>
          {moviesByGenre?.movies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              className='list-group-item list-group-item-action'
              key={movie.id}
            >
              {movie.title}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

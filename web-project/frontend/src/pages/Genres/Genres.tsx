import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GenreItem } from '../../models/models';

export const Genres = () => {
  const [genres, setGenres] = useState<GenreItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/v1/genres')
      .then((response) => {
        if (response.status !== 200) {
          const err = new Error();
          err.message = `Invalid response code: ${response.status}`;

          setError(err);
        }

        return response.json();
      })
      .then((json) => {
        setGenres(json.genres);
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

  if (!genres) {
    return <p>No genres on the database</p>;
  }

  return (
    <>
      <h2>Genres</h2>

      <div className='list-group'>
        {genres.map((genre) => (
            <Link
            key={genre.id}
              className='list-group-item list-group-item-action'
              to={`/genres/${genre.id}`}
            >
              {genre.genre_name}
            </Link>
        ))}
      </div>
    </>
  );
};

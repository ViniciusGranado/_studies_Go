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

  return (
    <>
      <h2>Genres</h2>

      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link to={`/genres/${genre.id}`}>{genre.genre_name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
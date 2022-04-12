import { useEffect, useState } from 'react';
import { MovieItem } from '../../models/models';
import { Link } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);

  useEffect(() => {
    setMovies([
      { id: 1, title: 'The Shawshank Redemption', runtime: 142 },
      { id: 2, title: 'The Godfather', runtime: 175 },
      { id: 3, title: 'The Dark Knight', runtime: 153 },
    ]);
  }, []);

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

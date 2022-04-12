import { useEffect, useState } from 'react';
import { Movie } from '../../models/models';

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies([
      { id: 1, title: 'The Shawshank Redemption', runtime: 142 },
      { id: 1, title: 'The Godfather', runtime: 175 },
      { id: 1, title: 'The Dark Knight', runtime: 153 },
    ]);
  }, []);

  return (
    <>
      <h2>Chose a movie</h2>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

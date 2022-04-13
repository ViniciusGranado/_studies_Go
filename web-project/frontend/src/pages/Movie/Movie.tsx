import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieItem } from '../../models/models';

export const Movie = () => {
  const [movie, setMovie] = useState<MovieItem>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/v1/movie/${id}`)
        .then((response) => {
          if (response.status !== 200) {
            const err = new Error();
            err.message = `Invalid response code: ${response.status}`;

            setError(err);
          }

          return response.json();
        })
        .then((json) => {
          setMovie(json.movie);
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

  if (!movie) {
    return <p>No movies on the database</p>;
  }

  let genres: string[];
  if (movie.genres) {
    genres = Object.values(movie.genres);
  } else {
    genres = [];
  }

  return (
    <>
      <h2>
        Movie: {movie.title} ({movie.year})
      </h2>

      <div className='float-start'>
        <small>Rating: {movie.mpaa_rating}</small>
      </div>
      <div className='float-end'>
        {genres.map((m, index) => (
          <span className='badge bg-secondary me-1' key={index}>
            {m}
          </span>
        ))}
      </div>
      <div className='clearfix' />

      <hr />

      <table className='table table-compact table-striped'>
        <thead></thead>

        <tbody>
          <tr>
            <td>
              <strong>Title:</strong>
            </td>
            <td>
              <strong>{movie.title}</strong>
            </td>
          </tr>

          <tr>
            <td><strong>Description:</strong></td>
            <td>{movie.description}</td>
          </tr>

          <tr>
            <td>
              <strong>Run time:</strong>
            </td>
            <td>
              <strong>{movie.runtime}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

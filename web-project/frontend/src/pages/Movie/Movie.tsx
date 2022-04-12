import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieItem } from '../../models/models';

export const Movie = () => {
  const [movie, setMovie] = useState<MovieItem>();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setMovie({
        id: parseInt(id),
        title: 'Some movie',
        runtime: 150,
      });
    }
  }, [id]);

  return (
    <>
      <h2>Movie: {movie?.title}</h2>

      <table className='table table-compact table-striped'>
        <thead></thead>

        <tbody>
          <tr>
            <td>
              <strong>Title:</strong>
            </td>
            <td>
              <strong>{movie?.title}</strong>
            </td>
          </tr>

          <tr>
            <td>
              <strong>Run time:</strong>
            </td>
            <td>
              <strong>{movie?.runtime}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

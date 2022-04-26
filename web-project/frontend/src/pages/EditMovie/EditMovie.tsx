import { useEffect, useState } from 'react';
import { MovieItem } from '../../models/models';

import './EditMovie.css';

const initialMovie: MovieItem = {
  description: '',
  genres: [],
  id: 1,
  mpaa_rating: 'R',
  rating: 5,
  release_date: '1999',
  runtime: 200,
  title: 'The Godfather',
  year: 1999
};

export const EditMovie = () => {
  const [movie, setMovie] = useState<MovieItem>(initialMovie);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <>
      <h2>Add/Edit Movie</h2>
      <hr />

      <form method='post'>
        <div className='mb-3'>
          <label htmlFor='title' className={`form-label`}>
            Title
          </label>
        </div>
        <input
          type='text'
          name='title'
          id='title'
          className='form-control'
          value={movie?.title}
        />

        <div className='mb-3'>
          <label htmlFor='release-date' className='form-label'>
            Release Date
          </label>
        </div>
        <input
          type='text'
          name='release-date'
          id='release-date'
          className='form-control'
          value={movie?.release_date}
        />

        <div className='mb-3'>
          <label htmlFor='runtime' className='form-label'>
            Runtime
          </label>
        </div>
        <input
          type='text'
          name='runtime'
          id='runtime'
          className='form-control'
          value={movie?.runtime}
        />

        <div className='mb-3'>
          <label htmlFor='mpaa_rating' className='form-label'>
            MPAA Rating
          </label>
        </div>
        <select className='form-select' value={movie?.mpaa_rating}>
          <option className='form-select'>Choose...</option>
          <option className='form-select' value='G'>
            G
          </option>
          <option className='form-select' value='PG'>
            PG
          </option>
          <option className='form-select' value='PG14'>
            PG14
          </option>
          <option className='form-select' value='R'>
            R
          </option>
          <option className='form-select' value='NC17'>
            NC17
          </option>
        </select>

        <div className='mb-3'>
          <label htmlFor='rating' className='form-label'>
            Rating
          </label>
        </div>
        <input
          type='text'
          name='rating'
          id='rating'
          className='form-control'
          value={movie?.rating}
        />

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
        </div>
        <textarea
          name='description'
          id='description'
          className='form-control'
          rows={3}
        >
          {movie?.description}
        </textarea>

        <hr />

        <button className='btn btn-primary'>Save</button>
      </form>
    </>
  );
};

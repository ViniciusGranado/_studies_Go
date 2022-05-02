import { useEffect, useState } from 'react';
import { Input } from '../../components/form/Input/Input';
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
  year: 1999,
};

export const EditMovie = () => {
  const [movie, setMovie] = useState<MovieItem>(initialMovie);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setMovie((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form was submited');
  };

  return (
    <>
      <h2>Add/Edit Movie</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <input type='hidden' name='id' id='id' value={movie.id} />

        <Input
          name='title'
          title='Title'
          type='text'
          value={movie.title}
          onChange={handleChange}
        />

        <Input
          name='release_date'
          title='Release Date'
          type='text'
          value={movie.release_date}
          onChange={handleChange}
        />

        <Input
          name='runtime'
          title='Runtime'
          type='text'
          value={movie.runtime}
          onChange={handleChange}
        />

        <Input
          name='mpaa_rating'
          title='MPAA Rating'
          type='Select'
          options={['G', 'PG', 'PG14', 'R', 'NC17']}
          value={movie.mpaa_rating}
          onChange={handleChange}
        />

        <Input
          name='rating'
          title='Rating'
          type='text'
          value={movie.rating}
          onChange={handleChange}
        />

        <Input
          name='description'
          title='Description'
          type='TextArea'
          value={movie.description}
          onChange={handleChange}
        />

        <hr />

        <button className='btn btn-primary'>Save</button>
      </form>

      <div className='mt-3'>
        <pre>{JSON.stringify(movie)}</pre>
      </div>
    </>
  );
};

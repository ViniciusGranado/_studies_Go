import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../../components/form/Input/Input';
import { MovieItem } from '../../models/models';

import './EditMovie.css';

const initialMovie: MovieItem = {
  description: '',
  genres: [],
  id: 0,
  mpaa_rating: '',
  rating: 0,
  release_date: '',
  runtime: 0,
  title: '',
  year: 0,
};

export const EditMovie: React.FC = () => {
  const [movie, setMovie] = useState<MovieItem>(initialMovie);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id && !isNaN(Number.parseInt(id))) {
      if (Number.parseInt(id) > 0) {
        fetch(`http://localhost:4000/v1/movie/${id}`)
          .then((response) => {
            if (response.status !== 200) {
              const err = new Error(`Invalid responde code: ${response.status}`);
              setError(err);
            }
              return response.json();
          })
          .then((json) => {
            const movie: MovieItem = json.movie;
            const releaseData = new Date(movie.release_date);

            setMovie({
              id: Number.parseInt(id),
              title: movie.title,
              release_date: releaseData.toISOString().split("T")[0],
              runtime: movie.runtime,
              mpaa_rating: movie.mpaa_rating,
              rating: movie.rating,
              description: movie.description,
              year: movie.year,
              genres: movie.genres,
            })

            setIsLoaded(true);
          })
      } else {
        setIsLoaded(true);
      }
    }
  }, [id]);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

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

package models

import (
	"context"
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

func (m *DBModel) Get(id int) (*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)

	defer cancel()

	query := "SELECT * from movies where id = $1"

	row := m.DB.QueryRowContext(ctx, query, id)

	var movie Movie

	err := row.Scan(
		&movie.ID,
		&movie.Title,
		&movie.Description,
		&movie.Year,
		&movie.ReleaseDate,
		&movie.Rating,
		&movie.Runtime,
		&movie.MPAARating,
		&movie.CreatetaAt,
		&movie.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	query = `SELECT mg.id, mg.movie_id, mg.genre_id, g.genre_name
						FROM movies_genres mg
						JOIN genres g
						ON g.id = mg.genre_id
						WHERE mg.movie_id = $1`

	rows, _ := m.DB.QueryContext(ctx, query, id)

	defer rows.Close()

	genres := make(map[int]string)

	for rows.Next() {
		var mg MovieGenre

		err := rows.Scan(
			&mg.ID,
			&mg.MovieId,
			&mg.GenreId,
			&mg.Genre.GenreName,
		)

		if err != nil {
			return nil, err
		}

		genres[mg.ID] = mg.Genre.GenreName
	}

	movie.MovieGenre = genres

	return &movie, nil
}

func (m *DBModel) All() ([]*Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)

	defer cancel()

	query := `SELECT * FROM movies ORDER BY title`

	rows, err := m.DB.QueryContext(ctx, query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var movies []*Movie

	for rows.Next() {
		var movie Movie

		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.Description,
			&movie.Year,
			&movie.ReleaseDate,
			&movie.Runtime,
			&movie.Rating,
			&movie.MPAARating,
			&movie.CreatetaAt,
			&movie.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		genreQuery := `SELECT mg.id, mg.movie_id, mg.genre_id, g.genre_name
		FROM movies_genres mg
		JOIN genres g
		ON g.id = mg.genre_id
		WHERE mg.movie_id = $1`

		genreRows, _ := m.DB.QueryContext(ctx, genreQuery, movie.ID)

		genres := make(map[int]string)

		for genreRows.Next() {
			var mg MovieGenre

			err := genreRows.Scan(
				&mg.ID,
				&mg.MovieId,
				&mg.GenreId,
				&mg.Genre.GenreName,
			)

			if err != nil {
				return nil, err
			}

			genres[mg.ID] = mg.Genre.GenreName
		}

		genreRows.Close()

		movie.MovieGenre = genres
		movies = append(movies, &movie)
	}

	return movies, nil
}

func (m *DBModel) AllGenres() ([]*Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3 * time.Second)

	defer cancel()

	query := `SELECT * FROM genres`

	rows, err := m.DB.QueryContext(ctx, query);

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var genres []*Genre

	for rows.Next() {
		var genre Genre

		err := rows.Scan(
			&genre.ID,
			&genre.GenreName,
			&genre.CreatetaAt,
			&genre.UpdatedAt,
		)

		if err != nil {
			return nil, err
		}

		genres = append(genres, &genre)
	}

	return genres, nil
}

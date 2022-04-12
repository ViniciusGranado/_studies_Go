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

	var genres []MovieGenre
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

		genres = append(genres, mg)
	}

	movie.MovieGenre = genres


	return &movie, nil
}

func (m *DBModel) All(id int) ([]*Movie, error) {
	return nil, nil
}

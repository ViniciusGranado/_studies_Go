package models

import (
	"database/sql"
	"time"
)

type Models struct {
	DB DBModel
}

func NewModels(db *sql.DB) Models {
	return Models {
		DB: DBModel{DB: db},
	}
}

type Movie struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Year int `json:"year"`
	ReleaseDate time.Time `json:"release_date"`
	Runtime int `json:"runtime"`
	Rating int `json:"Rating"`
	MPAARating string `json:"mpaa_rating"`
	CreatetaAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	MovieGenre []MovieGenre `json:"genres"`
}

type Genre struct {
	ID int `json:"-"`
	GenreName string `json:"genre_name"`
	CreatetaAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type MovieGenre struct {
	ID int `json:"-"`
	MovieId int `json:"-"`
	GenreId int `json:"-"`
	Genre Genre `json:"genre"`
	CreatetaAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
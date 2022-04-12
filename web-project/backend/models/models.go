package models

import "time"

type Movie struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Year int `json:"year"`
	ReleaseDate time.Time `json:"release_date"`
	Runtime int `json:"runtime"`
	Rating int `json:"Rating"`
	MPAARating string `json:"mpaa_rating"`
	CreatetaAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	MovieGenre []MovieGenre `json:"-"`
}

type Genre struct {
	ID int `json:"id"`
	GenreName string `json:"genre_name"`
	CreatetaAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MovieGenre struct {
	ID int `json:"id"`
	MovieId int `json:"movie_id"`
	GenreId int `json:"genre_id"`
	Genre Genre `json:"genre"`
	CreatetaAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
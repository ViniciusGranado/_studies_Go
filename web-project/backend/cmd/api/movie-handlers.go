package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

type jsonResp struct {
	OK bool `json:"ok"`
	Message string `json:"message"`
}

func (app *application) getOneMovie(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))

	if err != nil {
		app.logger.Println(errors.New("invalid id parameter"))

		app.errorJson(w, err)
		return
	}

	movie, err := app.models.DB.Get(id)

	if err != nil {
		app.errorJson(w, err)
		return
	}

	err = app.writeJson(w, http.StatusOK, movie, "movie")

	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := app.models.DB.All()

	if err != nil {
		app.errorJson(w, err)
		return
	}

	err = app.writeJson(w, http.StatusOK, movies, "movies")

	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllGenres(w http.ResponseWriter, r *http.Request) {
	genres, err := app.models.DB.AllGenres()

	if err != nil {
		app.errorJson(w, err)
		return
	}

	err = app.writeJson(w, http.StatusOK, genres, "genres")

	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllMoviesByGenre(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("genre_id"))

	if err != nil {
		app.logger.Println(errors.New("invalid id parameter"))

		app.errorJson(w, err)
		return
	}

	movies, err := app.models.DB.AllMoviesByGenre(id)

	if err != nil {
		app.errorJson(w, err)
		return
	}

	err = app.writeJson(w, http.StatusOK, movies, "movies")

	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) deleteMovie(w http.ResponseWriter, r *http.Request) {

}

type MoviePayload struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Description string `json:"description"`
	Year string `json:"year"`
	ReleaseDate string `json:"release_ping"`
	Runtime string `json:"runtime"`
	Rating string `json:"Rating"`
	MPAARating string `json:"mpaa_rating"`
}

func (app *application) editMovie(w http.ResponseWriter, r *http.Request) {
	var payload MoviePayload

	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		app.errorJson(w, err)
		return
	}
	
	log.Println(payload.Title)

	var movie models.Movie

	movie.ID, _ = strconv.Atoi(payload.ID)
	movie.Title, _ = payload.Title
	movie.Description, _ = payload.Description
	movie.ReleaseDate, _ = time.Parse("2006-01-02", payload.ReleaseDate)
	movie.Year = movie.ReleaseDate.Year()
	movie.Runtime, _ = strconv.Atoi(payload.Runtime) 
	movie.Rating, _ = strconv.Atoi(payload.Rating) 
	movie.MPAARating = payload.MPAARating
	movie.CreatedAt = time.Now()
	movie.UpdatedAt = time.Now()

	err = app.models.DB.InsertMovie(movie)

	if err != nil {
		app.errorJson(w, err)
		return
	}

	ok := jsonResp{
		OK: true,
	}

	err = app.writeJson(w, http.StatusOK, ok, "response");

	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) searchMovies(w http.ResponseWriter, r *http.Request) {

}

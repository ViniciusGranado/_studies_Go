export interface MovieItem {
	id: number;
	title: string;
	description: string;
	year: number;
	release_date: string;
	runtime: number;
	rating: number;
	mpaa_rating: string;
	genres: {
    [id: number]: string;
  };
}

export interface GenreItem {
	id: number;
	genre_name: string;
}

export interface MoviesByGenre {
	genre_name: string;
	movies: MovieItem[];
}
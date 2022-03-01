const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const BASE_PATH = "https://api.themoviedb.org/3";

// https://developers.themoviedb.org/3/getting-started/introduction

interface IMovie {
	backdrop_path: string;
	id: number;
	overview: string;
	poster_path: string;
	title: string;
	video: false;
}

export interface IGetMovieResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedMovies() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const BASE_PATH = "https://api.themoviedb.org/3";

// https://developers.themoviedb.org/3/getting-started/introduction

export function getNowPlayingMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function getPopularMovies() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedMovies() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getUpcomingMovies() {
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getAiringTvShows() {
	return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getNowPlayingTvShows() {
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function getPopularTvShows() {
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedTvShows() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function findMovies(keyword: string | null) {
	return fetch(
		`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
	).then((response) => response.json());
}

export function findTvShows(keyword: string | null) {
	return fetch(
		`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
	).then((response) => response.json());
}

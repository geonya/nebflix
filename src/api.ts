import { atom } from "recoil";

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const BASE_PATH = "https://api.themoviedb.org/3";

// https://developers.themoviedb.org/3/getting-started/introduction

export const currentSlider = atom<[string, string]>({
	key: "qeuryKey",
	default: ["", ""],
});

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

interface ITv {
	backdrop_path: string;
	id: number;
	overview: string;
	poster_path: string;
	name: string;
	video: false;
}

export interface IGetTvResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: ITv[];
	total_pages: number;
	total_results: number;
}

export function getNowPlayingMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedMovies() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getNowPlayingTvShows() {
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedTvShows() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

const API_KEY = "0d22bba8e2d67dad7a9bfff6e35b1d56";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

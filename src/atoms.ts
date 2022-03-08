import { atom } from "recoil";

interface IMovie {
	backdrop_path: string;
	id: number;
	overview: string;
	poster_path: string;
	title: string;
	video: false;
	name?: string;
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
export const sectionState = atom({
	key: "section",
	default: ["", 0],
});

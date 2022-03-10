import { atom } from "recoil";

export interface IMovie {
	id: number;
	title?: string;
	name?: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	isLike?: boolean;
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

interface ISection {
	sectionId: number;
	sectionName: string;
}

export const sectionState = atom<ISection>({
	key: "section",
	default: { sectionId: 0, sectionName: "" },
});

export const favState = atom<IMovie[]>({
	key: "favs",
	default: [
		{
			backdrop_path: "/9OYu6oDLIidSOocW3JTGtd2Oyqy.jpg",
			id: 71712,
			name: "The Good Doctor",
			overview:
				"Shaun Murphy, a young surgeon with autism and savant syndrome, relocates from a quiet country life to join a prestigious hospital's surgical unit. Unable to personally connect with those around him, Shaun uses his extraordinary medical gifts to save lives and challenge the skepticism of his colleagues.",
			poster_path: "/cXUqtadGsIcZDWUTrfnbDjAy8eN.jpg",
			isLike: true,
		},
	],
});

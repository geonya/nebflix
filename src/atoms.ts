import { atom } from "recoil";

export interface IMovie {
	id: number;
	title?: string;
	name?: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	isLike?: boolean;
	genres?: { name: string }[];
	first_air_date?: string;
	release_date?: string;
	vote_average?: number;
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

export interface IVideo {
	name: string;
	id: number;
	key: string;
	type: string;
}

export interface IGetVideoResult {
	id: number;
	results: IVideo[];
}

export interface ISection {
	id?: number;
	part: string | null;
	query?: string;
}

export const sectionState = atom<ISection>({
	key: "section",
	default: { id: 0, part: "", query: "" },
});

const localStorageEffects =
	(key: string) =>
	({ setSelf, onSet }: any) => {
		const savedFavs = localStorage.getItem(key);
		if (savedFavs != null) {
			setSelf(JSON.parse(savedFavs));
		}
		onSet((favs: IMovie[]) =>
			localStorage.setItem(key, JSON.stringify(favs))
		);
	};

export const favState = atom<IMovie[]>({
	key: "favs",
	default: [],
	effects: [localStorageEffects("favs")],
});

export const videoKeyState = atom({
	key: "videoKey",
	default: "",
});

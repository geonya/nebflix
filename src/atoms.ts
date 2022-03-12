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

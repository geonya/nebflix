export const makeImagePath = (id: string, format?: string) =>
	`https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;

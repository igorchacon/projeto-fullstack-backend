export type Post = {
    id: string,
	title: string,
	author: string,
	date: Date,
	file: string,
	genre: string[],
	album: string,
    author_id: string
};

export interface createPostInputDTO {
    title: string,
	author: string,
    file: string,
	genre: string[],
	album: string,
    token: string
}

export enum musicGenres {
	ROCK = 'rock',
	GOSPEL = 'gospel',
	INDIE = "indie",
	POP = "pop",
    METAL = "metal"
}
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

export interface getPostByIdDTO {
	author_id: string;
}
export function toPostModel(obj: any): Post {
	return obj && {
		id: obj.id,
		title: obj.title,
		author: obj.author,
		date: obj.date,
		file: obj.file,
		genre: obj.genre,
		album: obj.album,
		author_id: obj.author_id
	}
}
import { Post } from "../entities/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    
    async createPost(post: Post) {
        try {
            await this.connection("fullstack_project_musics")
            .insert({
                id: post.id,
                title: post.title,
                author: post.author,
                file: post.file,
                album: post.album,
                author_id: post.author_id,
                date: post.date.toISOString().substring(0, 10)             
            });
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
import { Post, toPostModel } from "../entities/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {

    async validateGenre (post: Post) {
        try {
            for (let i = 0; i < post.genre.length; i++) {
                const genre_id = await this.connection("fullstack_project_music_genre")
                    .select("id")
                    .where({ "genre": post.genre[i] })

                if (!genre_id) {
                    throw new Error(`The selected gender ${genre_id[i]} does not exist. Contect admin.`);
                }
            }
            return true;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    
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

            for (let i = 0; i < post.genre.length; i++) {
                const genre_id = await this.connection("fullstack_project_music_genre")
                    .select("*")
                    .where({ "genre": post.genre[i] })
                

                await this.connection("fullstack_project_genre_of_music")
                    .insert({
                        music_id: post.id,
                        genre_id: genre_id[i].id
                    })
            }
            
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getPostById(id: string): Promise<Post> {
        try {
            const result: any = await this.connection("fullstack_project_musics")
                .select("*")
                .where({ id })

            return toPostModel(result[0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
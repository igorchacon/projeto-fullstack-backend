import { PostDatabase } from "../data/PostDatabase";
import { createPostInputDTO, musicGenres, Post } from "../entities/Post";
import { Authentication } from "../entities/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class PostBusiness {
    async createPost(input: createPostInputDTO) {

        try {
            const tokenManager = new Authenticator();    
        
            if (!input.token) {
                throw new Error("A jwt must be provided");
            };

            const tokenData: Authentication = tokenManager.getData(input.token);

            const idGenerator = new IdGenerator();
            const id: string = idGenerator.generateId();

            const post: Post = {
                id,
                author_id: tokenData.id,
                title: input.title,
                date: new Date(),
                author: input.author,
                file: input.file,
                genre: input.genre,
                album: input.album,
            }

            await new PostDatabase().validateGenre(post);

            await new PostDatabase().createPost(post);

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
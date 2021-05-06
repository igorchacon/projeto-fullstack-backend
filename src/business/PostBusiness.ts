import { PostDatabase } from "../data/PostDatabase";
import { createPostInputDTO, getPostByIdDTO, Post } from "../entities/Post";
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
    };

    async getPostById(input: getPostByIdDTO) {
        try {
            
            const post: Post = await new PostDatabase().getPostById(input.author_id);

            if (!post) {
                throw new Error("post not found");
            };

            return post;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}
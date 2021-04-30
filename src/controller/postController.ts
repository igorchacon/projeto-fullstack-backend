import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { createPostInputDTO } from "../entities/Post";

export class PostController {

    createPost = async (req: Request, res: Response) => {
        try {
            let message = "Success!";
            const token: string = req.headers.authorization as string;

            const input: createPostInputDTO = {
                title: req.body.title,
                author: req.body.author,
                file: req.body.file,
                genre: req.body.genre,
                album: req.body.album,
                token
            };

            await new PostBusiness().createPost(input);

            res.status(201).send({ message });
        } catch (error) {
            let message = error.sqlMessage || error.message
            res.statusCode = 400;
            res.send(message);
        }
        
    }
}
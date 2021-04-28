import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { SignupInputDTO } from "../entities/User";

export class UserController {

    async signup (req: Request, res: Response) { 
        try {
            let message = "Sucess!";
            const {name, email, nickname, password } = req.body;

            const input: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password                
            }

            const userBusiness = new UserBusiness();
            const token = await userBusiness.signup(input);

                res.status(201).send({ message, token });
    
        } catch (error) {
            res.statusCode = 400;
            let message = error.sqlMessage || error.message

            res.send(message);
        }
    }
}
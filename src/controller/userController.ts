import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginInputDTO, SignupInputDTO, User } from "../entities/User";

export class UserController {

        //SignUp endpoint controller
    async signup (req: Request, res: Response) { 
        try {
            let message = "Success!";

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

        //Login endpoint controller
    async login (req: Request, res: Response) {
        try {
            let message = "Success!";

            const { email, password } = req.body;

            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await new UserBusiness().login(input);

            res.status(200).send({ message, token });
        } catch (error) {
            res.statusCode = 400;
            res.send(error.sqlMessage || error.message);
        }
    }
}
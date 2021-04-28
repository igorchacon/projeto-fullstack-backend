import { SignupInputDTO, User } from "../entities/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
    
    async signup (input: SignupInputDTO): Promise<string> {
        try {
            if (!input.name || !input.email || !input.password || !input.nickname) {
                throw new Error("Please insert name, email, nickname and password.");
            };
    
            const idGenerator = new IdGenerator();
            const id: string = idGenerator.generateId();
    
            const hashManager = new HashManager();
            const cypherPassword = await hashManager.hash(input.password);   

            const user: User = {
                id,
                name: input.name,
                email: input.email,
                nickname: input.nickname,
                password: cypherPassword
            };

            const userDatabase = new UserDatabase();
            await userDatabase.insertUser(user);

            const tokenManager = new Authenticator();
            const token: string = tokenManager.generateToken({ id });

            return token;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
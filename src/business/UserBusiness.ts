import { LoginInputDTO, SignupInputDTO, User } from "../entities/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
    
    //SignUp endpoint business
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

    //Login endpoint business
    async login (input: LoginInputDTO): Promise<string> {

        try {
            if (!input.email || !input.password ) {
                throw new Error("Email and password must be valid!");
            };

            const userDatabase = new UserDatabase();
            const user: User = await userDatabase.getUserByEmail(input.email);

            if (!user) {
                throw new Error("Invalid credentials")
            };

            const hashManager = new HashManager();
            const passwordIsCorrect: boolean = await hashManager.compare(input.password, user.password);
    
            if (!passwordIsCorrect) {
                throw new Error("Invalid credentials.");
            };
    
            const tokenManager = new Authenticator();
            const token: string = tokenManager.generateToken({
                id: user.id
            });

            return token;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    } 
}
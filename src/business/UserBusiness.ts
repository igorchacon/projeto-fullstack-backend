import { SignupInputDTO } from "../entities/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    
    async signup (input: SignupInputDTO) {
        try {
            if (!input.name || !input.email || !input.password || !input.nickname) {
                throw new Error("Please insert name, email, nickname and password.");
            };
    
            const idGenerator = new IdGenerator();
            const id: string = idGenerator.generateId();
    
            const hashManager = new HashManager();
            const cypherPassword = await hashManager.hash(input.password);
    
            
    
            const token: string = genarateToken({ id });
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
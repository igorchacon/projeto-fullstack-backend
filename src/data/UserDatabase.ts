import { toUserModel, User } from "../entities/User";
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {

    //SignUp endpoint database
    async insertUser(user: User) {
        
        try {

            await this.connection("fullstack_project_users")
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                nickname: user.nickname,
                password: user.password
            });

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    //Login endpoint database
    async getUserByEmail(email: string): Promise<User> {
        try {
            const result: any = await this.connection("fullstack_project_users")
                .select("*")
                .where({ email });

            return toUserModel(result[0]);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
            
        }
    }
}
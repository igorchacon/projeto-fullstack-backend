import { User } from "../entities/User";
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {

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
}
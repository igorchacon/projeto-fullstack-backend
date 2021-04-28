import { User } from "../entities/User";
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    async insertUser(user: User) {
        try {
            await connection("fullstack_project_users")
            .insert({
                id,
                name,
                email,
                nickname,
                cypherPassword
            });
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
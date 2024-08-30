import { ObjectId } from "mongodb"
import bcrypt from 'bcrypt';
import { userDBType } from "../repositories/types";
import { usersRepository } from "../repositories/users-repository";

export const usersService = {
    async createUser(login: string, email: string, password: string): Promise<userDBType> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt);

        const newUser: userDBType = {
            _id: new ObjectId(),
            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date()
        }
        return usersRepository.createUser(newUser);
    },

    async findUserById(id: ObjectId): Promise<userDBType | null> {
        return usersRepository.findUserById(id);
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) return false;
        const passwordHash = await this._generateHash(password, user.passwordSalt);
        if (user.passwordHash !== passwordHash) {
            return false;
        }

        return true;
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
}
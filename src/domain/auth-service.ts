import { ObjectId } from "mongodb"
import bcrypt from 'bcrypt';
import { usersRepository } from "../repositories/users-repository";
import { UserAccountDBType } from "../repositories/types/user-db-type";
import { v4 as uuidv4 } from 'uuid'
import { add } from "date-fns";
import { emailAdapter } from "../adapters/email-adapter";

export const authService = {
    async createUser(login: string, email: string, password: string): Promise<UserAccountDBType | null> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt);

        const user: UserAccountDBType = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                passwordSalt,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: false
            }
        }
        const saveResult = usersRepository.saveUser(user);

        // try {
        //     await emailAdapter.sendEmail(user);
        // } catch (error) {
        //     console.error(error);
        //     await usersRepository.deleteUser(user._id);
        //     return null;
        // }

        return saveResult;
    },

    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        return usersRepository.findUserById(id);
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail);

        if (!user) return false;
        if (!user.emailConfirmation.isConfirmed) return null;

        const passwordHash = await this._generateHash(password, user.passwordSalt);
        if (user.passwordHash !== passwordHash) {
            return false;
        }
        return user;
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },

    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersRepository.findUserByConfirmationCode(code);
        if (!user) return false;
        if (user.emailConfirmation.isConfirmed) return false;
        if (user.emailConfirmation.confirmationCode !== code) return false;
        if (user.emailConfirmation.expirationDate < new Date()) return false;

        let result = await usersRepository.updateConfirmation(user._id);
        return result;
    }
}
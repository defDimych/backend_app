import { ObjectId } from "mongodb";
import { usersCollection } from "../db/db";
import { UserAccountDBType } from "./types/user-db-type";

export const usersRepository = {
    async getAllUsers(): Promise<UserAccountDBType[]> {
        return usersCollection
            .find()
            .sort('createdAt', -1)
            .toArray()
    },

    async saveUser(user: UserAccountDBType): Promise<UserAccountDBType> {
        const result = await usersCollection.insertOne(user);
        return user;
    },

    async updateConfirmation(_id: ObjectId) {
        let result = await usersCollection
            .updateOne({ _id }, { $set: { 'emailConfirmation.isConfirmed': true } })

        return result.modifiedCount === 1;
    },

    async findUserById(id: ObjectId): Promise<UserAccountDBType | null> {
        let product = await usersCollection.findOne({ _id: id });
        if (product) {
            return product
        } else {
            return null
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({ $or: [{ email: loginOrEmail }, { userName: loginOrEmail }] });
        return user;
    },

    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({ "emailConfirmation.confirmationCode": emailConfirmationCode });
        return user;
    }
}
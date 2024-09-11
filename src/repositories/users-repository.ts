import { ObjectId } from "mongodb";
import { usersCollection } from "../db/db";
import { userDBType } from "./types/user-db-type";

export const usersRepository = {
    async getAllUsers(): Promise<userDBType[]> {
        return usersCollection
        .find()
        .sort('createdAt', -1)
        .toArray()
    },

    async createUser(user: userDBType): Promise<userDBType> {
        const result = await usersCollection.insertOne(user);
        return user;
    },

    async findUserById(id: ObjectId): Promise<userDBType | null> {
        let product = await usersCollection.findOne({ _id: id});
        if (product) {
            return product
        } else {
            return null
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({ $or: [ { email: loginOrEmail}, { userName: loginOrEmail} ] });
        return user;
    }

}
import { userDBType } from "../repositories/types/user-db-type";
import jwt from 'jsonwebtoken';
import { settings } from "../settings";
import { ObjectId } from "mongodb";

export const jwtService = {
    async createJWT(user: userDBType) {
        const token = jwt.sign({userId: user._id}, settings.JWT_SECRET, {expiresIn: '1h'});
        return token;
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET);
            return new ObjectId(result.userId);
        } catch (error) {
            return null;
        }
    }
}
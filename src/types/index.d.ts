import { userDBType } from "../repositories/types/user-db-type";

declare global {
    declare namespace Express {
        export interface Request {
            user: userDBType | null
        }
    }
}
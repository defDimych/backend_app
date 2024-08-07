import express from 'express';
import { HTTP_STATUSES } from "../utils";
import { DBType } from '../db/db-in-memory';

export const getTestsRouter = (db: DBType) => {
    const router = express.Router();

    router.delete('/data', (req: any, res: any) => {
        db.courses = [];
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });

    return router;
}
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUSES } from "../utils";
import { jwtService } from "../application/jwt-service";
import { authService } from "../domain/auth-service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(HTTP_STATUSES.UNAUTHORIZED_401);
        return;
    }

    const token = req.headers.authorization.split(' ')[1];

    const userId = await jwtService.getUserIdByToken(token);
    if (userId) {
        req.user = await authService.findUserById(userId);
        next();
    } else {
        res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401);
    }
}
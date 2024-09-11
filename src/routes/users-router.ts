import { Request, Response, Router } from "express";
import { usersService } from "../domain/users-service";
import { HTTP_STATUSES } from "../utils";

export const usersRouter = Router({});

usersRouter.post('/users', 
    async (req: Request, res: Response) => {
        const newProduct = await usersService.createUser(req.body.login, req.body.email, req.body.password);
        res.status(HTTP_STATUSES.CREATED_201).send(newProduct);
    }
)
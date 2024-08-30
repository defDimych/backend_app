import { Request, Response, Router } from "express";
import { usersService } from "../../domain/users-service";
import { HTTP_STATUSES } from "../../utils";

export const authRouter = Router({});

authRouter.post('/login', 
    async (req: Request, res: Response) => {
        const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);

        if (user) {
            // const token = await jwtService.createJWT(user);
            // res.status(HTTP_STATUSES.CREATED_201).send(token);
        } else {
            res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        }
    }
)
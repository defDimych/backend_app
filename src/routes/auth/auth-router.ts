import { Request, Response, Router } from "express";
import { authService } from "../../domain/auth-service";
import { jwtService } from "../../application/jwt-service";
import { HTTP_STATUSES } from "../../utils";

export const authRouter = Router({});

authRouter.post('/registration',
    async (req: Request, res: Response) => {
        const user = await authService.createUser(req.body.login, req.body.email, req.body.password);
        if (user) {
            res.status(HTTP_STATUSES.CREATED_201).send(user);
        } else {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).send({});
        }
    }
)

authRouter.post('/login',
    async (req: Request, res: Response) => {
        const user = await authService.checkCredentials(req.body.loginOrEmail, req.body.password);

        if (user) {
            const token = await jwtService.createJWT(user);
            res.status(201).send(token);
        } else {
            res.sendStatus(401);
        }
    }
)

authRouter.post('/confirm-email', 
    async (req: Request, res: Response) => {
        const result = await authService.confirmEmail(req.body.code);

    }
)
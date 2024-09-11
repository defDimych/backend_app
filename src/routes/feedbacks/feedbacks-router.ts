import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth-middleware";
import { HTTP_STATUSES } from "../../utils";
import { feedbacksService } from "../../domain/feedbacks-service";

export const feedbacksRouter = Router({});

feedbacksRouter
    .post('/feedbacks', authMiddleware,
        async (req, res) => {
            const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.user!._id);
            res.status(HTTP_STATUSES.CREATED_201).send(newProduct);
        })
    .get('/feedbacks', async (req, res) => {
        const users = await feedbacksService.allFeedbacks();
        res.send(users);
    })
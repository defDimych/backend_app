import express, { NextFunction, Request, Response } from 'express';
import { getCoursesRouter } from './routes/courses';
import { getTestsRouter } from './routes/tests';
import { db } from './db/db-in-memory';
import { authRouter } from './routes/auth/auth-router';
import { feedbacksRouter } from './routes/feedbacks/feedbacks-router';
import { emailRouter } from './routes/email-router';


export const app = express();

let requestCounter = 0;
const counterRequestsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++;
    next();
}

app.use(counterRequestsMiddleware);

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

// app.use('/interesting', getInterestingRouter);
app.use('/courses', getCoursesRouter());
app.use('/__test__', getTestsRouter(db));
app.use('/auth', authRouter);
app.use(feedbacksRouter)
app.use(emailRouter);
import express from 'express';
import { addCoursesRoutes } from './routes/courses';
import { db, HTTP_STATUSES } from './routes/courses';

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

addCoursesRoutes(app);

app.delete('/__test__/data', (req: any, res: any) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
import express from 'express';
import { getCoursesRouter } from './routes/courses';
import { getTestsRouter } from './routes/tests';
import { db } from './db/db';
import { getInterestingRouter } from './routes/getInterestingRouter';
// import { db, HTTP_STATUSES } from './routes/courses';

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use('/interesting', getInterestingRouter(db));
app.use('/courses', getCoursesRouter(db));
app.use('/__test__', getTestsRouter(db));


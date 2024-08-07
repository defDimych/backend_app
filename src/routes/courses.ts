import { CourseViewModel } from '../models/CourseViewModel';
import express, { Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types';
import { CreateCourseModel } from '../models/CreateCourseModel';
import { UpdateCourseModel } from '../models/UpdateCourseModel';
import { QueryCoursesModel } from '../models/QueryCoursesModel';
import { URIParamsCourseIdModel } from '../models/URIParamsCourseIdModel';
import { courseType } from '../db/db';
import { HTTP_STATUSES } from '../utils';
import { body } from 'express-validator';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { coursesService } from '../domain/courses-service';

export const getCourseViewModel = (dbCourse: courseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    };
};

const titleValidation = () => body('title').isLength({ min: 4, max: 10 }).withMessage('Title length should be from 3 to 10 symbols');

export const getCoursesRouter = () => {
    const router = express.Router();

    router.get('/', async(req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
        const foundCourses: courseType[] = await coursesService.findCourses(req.query.title?.toString());

        res.json(foundCourses.map(getCourseViewModel));
    });
    router.get('/:id', async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
        const foundCourse = await coursesService.getCourseById(+req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }

        res.json(getCourseViewModel(foundCourse));
    });
    router.post('/',
        titleValidation(),
        inputValidationMiddleware,
        async (req: RequestWithBody<CreateCourseModel>, res: Response) => {
            const newCourse: courseType = await coursesService.createCourse(req.body.title);

            res
                .status(HTTP_STATUSES.CREATED_201)
                .json(getCourseViewModel(newCourse));
        });
    router.delete('/:id', async (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
        const isDeleted = await coursesService.deleteCourse(+req.params.id);

        if (isDeleted) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        }
    });
    router.put('/:id',
        titleValidation(),
        inputValidationMiddleware,
        async (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res: Response) => {
            const isUpdated = await coursesService.updateCourse(+req.params.id, req.body.title);

            if (isUpdated) {
                res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
            } else {
                res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            }
        });

    return router;
};

import { CourseViewModel } from '../models/CourseViewModel';
import express, { Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types';
import { CreateCourseModel } from '../models/CreateCourseModel';
import { UpdateCourseModel } from '../models/UpdateCourseModel';
import { QueryCoursesModel } from '../models/QueryCoursesModel';
import { URIParamsCourseIdModel } from '../models/URIParamsCourseIdModel';
import { DBType, courseType } from '../db/db';
import { HTTP_STATUSES } from '../utils';

export const getCourseViewModel = (dbCourse: courseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    };
};

export const getCoursesRouter = (db: DBType) => {
    const router = express.Router();

    router.get('/', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
        let foundCourses = db.courses;

        if (req.query.title) {
            foundCourses = foundCourses
                .filter(course => course.title.indexOf(req.query.title as string) > -1);
        }

        res.json(foundCourses.map(getCourseViewModel));
    });
    router.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
        const foundCourse = db.courses.find(course => course.id === +req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }

        res.json(getCourseViewModel(foundCourse));
    });
    router.post('/', (req: RequestWithBody<CreateCourseModel>, res: Response<CourseViewModel>) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }

        const createdCourse: courseType = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 0
        };

        db.courses.push(createdCourse);

        res
            .status(HTTP_STATUSES.CREATED_201)
            .json(getCourseViewModel(createdCourse));
    });
    router.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
        db.courses = db.courses.filter(course => course.id !== +req.params.id);

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
    router.put('/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res) => {
        if (!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }

        const foundCourse = db.courses.find(course => course.id === +req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }

        foundCourse.title = req.body.title;

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });

    return router;
};

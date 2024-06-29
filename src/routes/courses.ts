import { CourseViewModel } from '../models/CourseViewModel';
import { Response, Express } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types';
import { CreateCourseModel } from '../models/CreateCourseModel';
import { UpdateCourseModel } from '../models/UpdateCourseModel';
import { QueryCoursesModel } from '../models/QueryCoursesModel';
import { URIParamsCourseIdModel } from '../models/URIParamsCourseIdModel';

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};

export type courseType = {
    id: number;
    title: string;
    studentsCount: number;
};

export const db: { courses: courseType[]; } = {
    courses: [
        { id: 1, title: 'front-end', studentsCount: 10 },
        { id: 2, title: 'back-end', studentsCount: 10 },
        { id: 3, title: 'automation qa', studentsCount: 10 },
        { id: 4, title: 'devops', studentsCount: 10 }
    ]
};

export const getCourseViewModel = (dbCourse: courseType): CourseViewModel => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    };
};

export const addCoursesRoutes = (app: Express) => {
    app.get('/courses', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
        let foundCourses = db.courses;

        if (req.query.title) {
            foundCourses = foundCourses
                .filter(course => course.title.indexOf(req.query.title as string) > -1);
        }

        res.json(foundCourses.map(getCourseViewModel));
    });
    app.get('/courses/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
        const foundCourse = db.courses.find(course => course.id === +req.params.id);

        if (!foundCourse) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
            return;
        }

        res.json(getCourseViewModel(foundCourse));
    });
    app.post('/courses', (req: RequestWithBody<CreateCourseModel>, res: Response<CourseViewModel>) => {
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
    app.delete('/courses/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
        db.courses = db.courses.filter(course => course.id !== +req.params.id);

        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    });
    app.put('/courses/:id', (req: RequestWithParamsAndBody<URIParamsCourseIdModel, UpdateCourseModel>, res) => {
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
};

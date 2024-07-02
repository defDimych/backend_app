import { DBType } from "../db/db";
import express from 'express';
import { QueryCoursesModel } from "../models/QueryCoursesModel";
import { RequestWithParams, RequestWithQuery } from "../types";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";

export const getInterestingRouter = (db: DBType) => {
    const router = express.Router();
    
    router.get('/books', (req: RequestWithQuery<QueryCoursesModel>, res) => {
       
        res.json( {title: "it\'s books handler"} );
    });
    router.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>, res) => {
        
        res.json( {title: 'data by id: ' + req.params.id} );
    });


    return router;
}
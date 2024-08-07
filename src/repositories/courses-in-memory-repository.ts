import { courseType } from "../db/db";
import { db } from "../db/db-in-memory";

export const coursesRepository = {
    async findCourses(title: string | null | undefined): Promise<courseType[]> {
        let foundCourses = db.courses;

        if (title) {
            foundCourses = foundCourses
                .filter(course => course.title.indexOf(title as string) > -1);
        } else {
            return db.courses;
        }

        return foundCourses;
    },
    
    async getCourseById(id: number): Promise<courseType | undefined> {
        const foundCourseById = db.courses.find(course => course.id === id);
        return foundCourseById;
    },

    async createCourse(title: string): Promise<courseType> {
        const createdCourse: courseType = {
            id: +(new Date()),
            title,
            studentsCount: 0
        };

        db.courses.push(createdCourse);
        return createdCourse;
    },

    async updateCourse(id: number, title: string): Promise<boolean> {
        const foundCourse = db.courses.find(course => course.id === id);

        if (foundCourse) {
            foundCourse.title = title;
            return true;
        } else {
            return false;
        }
    },

    async deleteCourse(id: number): Promise<boolean> {
        for (let i = 0; i < db.courses.length; i++) {
            if (db.courses[i].id === id) {
                db.courses.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}
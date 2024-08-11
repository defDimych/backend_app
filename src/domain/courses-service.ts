import { courseType } from "../db/db";
import { coursesRepository } from "../repositories/courses-db-repository";

export const coursesService = {
    async findCourses(title: string | null | undefined): Promise<courseType[]> {
        return coursesRepository.findCourses(title);
    },
    
    async getCourseById(id: number): Promise<courseType | null> {
        return coursesRepository.getCourseById(id);
    },

    async createCourse(title: string): Promise<courseType> {
        const newCourse: courseType = {
            id: +(new Date()),
            title,
            studentsCount: 0
        };

        const createdCourse = await coursesRepository.createCourse(newCourse);
        return createdCourse;
    },

    async updateCourse(id: number, title: string): Promise<boolean> {
        return await coursesRepository.updateCourse(id, title);
    },

    async deleteCourse(id: number): Promise<boolean> {
        return await coursesRepository.deleteCourse(id);
    }
}
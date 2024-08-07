import { coursesCollection, courseType } from "../db/db";

export const coursesRepository = {
    async findCourses(title: string | null | undefined): Promise<courseType[]> {
        let filter: any = {};

        if (title) {
            filter.title = {$regex: title};
        } 

        return coursesCollection.find(filter).toArray();
    },
    
    async getCourseById(id: number): Promise<courseType | null> {
        const foundCourseById: courseType | null = await coursesCollection.findOne({ id });
        return foundCourseById;
    },

    async createCourse(newCourse: courseType): Promise<courseType> {
        const result = await coursesCollection.insertOne(newCourse);
        return newCourse;
    },

    async updateCourse(id: number, title: string): Promise<boolean> {
        const result = await coursesCollection.updateOne({id}, { $set: {title} });
        return result.matchedCount === 1;
    },

    async deleteCourse(id: number): Promise<boolean> {
        const result = await coursesCollection.deleteOne({ id });
        return result.deletedCount === 1;
    }
}
import { ObjectId } from "mongodb";
import { feedbacksCollection } from "../db/db";
import { FeedbackDBType } from "./types/feedback-db-type";

export const feedbacksRepository = {
    async getAllFeedbacks(): Promise<FeedbackDBType[]> {
        return await feedbacksCollection.find({}).toArray();
    },

    async createFeedback(comment: string, userId: ObjectId): Promise<FeedbackDBType> {
        const result = await feedbacksCollection.insertOne({ comment, userId });

        return {
            comment,
            userId
        };
    }
}
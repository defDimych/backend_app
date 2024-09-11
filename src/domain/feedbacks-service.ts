import { ObjectId } from "mongodb";
import { FeedbackDBType } from "../repositories/types/feedback-db-type";
import { feedbacksRepository } from "../repositories/feedbacks-db-repository";

export const feedbacksService = {
    async allFeedbacks(): Promise<FeedbackDBType[]> {
        return feedbacksRepository.getAllFeedbacks();
    },

    async sendFeedback(comment: string, userId: ObjectId): Promise<FeedbackDBType> {
        return feedbacksRepository.createFeedback(comment, userId);
    }
}
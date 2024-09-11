import { ObjectId } from "mongodb"

export type FeedbackDBType = {
    comment: string,
    userId: ObjectId
}
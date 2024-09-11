import { MongoClient } from "mongodb";
import { userDBType } from "../repositories/types/user-db-type";
import { FeedbackDBType } from "../repositories/types/feedback-db-type";

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017';

const client = new MongoClient(mongoUri);

export async function runDb() {
    try {
        await client.connect();
        await client.db('it-incubator').command({ ping: 1 });

        console.log('Connected successfully to mongo server');
    } catch {
        console.log("Can't connect to db");

        await client.close();
    }
}

const db = client.db('it-incubator');
export const coursesCollection = db.collection<courseType>('courses');
export const usersCollection = db.collection<userDBType>('users');
export const feedbacksCollection = db.collection<FeedbackDBType>('feedbacks');

export type courseType = {
    id: number;
    title: string;
    studentsCount: number;
};
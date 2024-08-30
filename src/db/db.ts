import { MongoClient } from "mongodb";
import { userDBType } from "../repositories/types";

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017';

const client = new MongoClient(mongoUri);

const db = client.db('it-incubator');
export const coursesCollection = db.collection<courseType>('courses');
export const usersCollection = db.collection<userDBType>('users');

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

export type courseType = {
    id: number;
    title: string;
    studentsCount: number;
};
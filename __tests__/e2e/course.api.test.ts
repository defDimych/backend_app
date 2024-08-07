import request from 'supertest';
import { app } from '../../src/app';
import { HTTP_STATUSES } from '../../src/utils';

describe('api-test', () => {
    it('It should return 200 and an array of courses', async() => {
        await request(app)
        .get('/courses')
        .expect(HTTP_STATUSES.OK_200);
    })
})
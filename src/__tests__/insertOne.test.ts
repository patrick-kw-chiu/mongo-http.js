import { initDatabase } from '../index';

describe('insertOne', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appHost: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const result = await db.collection('hotTags').insertOne({
            date: '2022-11-25T00:00:00.000+00:00',
            tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python'],
        });

        const { isSuccess, insertedId = '' } = result;
        expect(isSuccess).toBe(true);
        expect(insertedId).not.toBe('');
    });
});

import { initClient, initDatabase, initCollection } from '../index';

describe('insertOne', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appId: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const result = await db.collection('hotTags').insertOne({
            cachedAt: '2022-11-25T17:44:59.981+00:00',
            tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python'],
        });

        const { isSuccess, insertedId = '' } = result;
        expect(isSuccess).toBe(true);
        expect(insertedId).not.toBe('');
    });
});

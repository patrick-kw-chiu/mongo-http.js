import { initDatabase } from '../index';

describe('insertMany', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appId: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const result = await db.collection('hotTags').insertMany([
            {
                date: '2022-11-01T00:00:00.000+00:00',
                tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python'],
            },
            {
                date: '2022-12-01T00:00:00.000+00:00',
                tags: ['goblin-mode', 'new-year', 'economic-crisis', 'yearly-review'],
            },
            {
                date: '2023-01-01T00:00:00.000+00:00',
                tags: ['new-habit', 'exercise', 'reading'],
            },
        ]);

        const { isSuccess, insertedIds = [] } = result;
        expect(isSuccess).toBe(true);
        expect(insertedIds).toHaveLength(3);
    });
});

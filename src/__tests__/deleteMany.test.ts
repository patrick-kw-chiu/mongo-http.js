import { initDatabase } from '../index';

describe('deleteMany', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appHost: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const result = await db.collection('hotTags').deleteMany({
            filter: {
                date: { $gte: '2022-12-01T00:00:00.000+00:00' },
            },
        });

        const { isSuccess, deletedCount } = result;
        expect(isSuccess).toBe(true);
        expect(deletedCount).toBe(3);
    });
});

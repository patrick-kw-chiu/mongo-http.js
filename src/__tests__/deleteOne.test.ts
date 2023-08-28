import { initDatabase } from '../index';

describe('deleteOne', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appId: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const result = await db.collection('hotTags').deleteOne({
            filter: {
                date: '2022-12-01T00:00:00.000+00:00',
            },
        });

        const { isSuccess, deletedCount } = result;
        expect(isSuccess).toBe(true);
        expect(deletedCount).toBe(1);
    });
});

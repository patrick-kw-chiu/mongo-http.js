import { initDatabase } from '../index';

describe('updateMany', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appId: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const update: Record<string, any> = {
            $set: { isFreeze: true },
        };

        const result = await db.collection('hotTags').updateMany({
            filter: {
                date: { $lt: '2023-01-01' },
            },
            update,
            upsert: true,
        });

        const { isSuccess, matchedCount, modifiedCount } = result;
        expect(isSuccess).toBe(true);
        expect(matchedCount).toBe(2);
        expect(modifiedCount).toBe(2);
    });
});

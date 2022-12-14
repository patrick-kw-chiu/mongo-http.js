import { initDatabase } from '../index';

describe('updateOne', () => {
    it('initDatabase', async () => {
        const db = initDatabase({
            appId: process.env.analyticsAppId || '',
            apiKey: process.env.analyticsApiKey || '',
            databaseName: process.env.analyticsDatabaseName || '',
        });

        const result = await db.collection('hotTags').updateOne({
            filter: {
                _id: { $oid: '63b4bc7d26d5de2f4762158f' },
            },
            update: {
                date: '2022-11-25T00:00:00.000+00:00',
                tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python', 'something-else'],
            },
            upsert: true,
        });

        const { isSuccess, matchedCount, modifiedCount, upsertedId } = result;
        expect(isSuccess).toBe(true);
        expect(matchedCount).toBe(1);
        expect(modifiedCount).toBe(1);
    });
});

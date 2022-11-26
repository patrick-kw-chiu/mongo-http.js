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
                _id: { $oid: '638199c045955b5e9701be1f' },
            },
            update: {
                date: '2022-11-25T00:00:00.000+00:00',
                tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python', 'something-else'],
            },
            upsert: true,
        });

        const { isSuccess, matchedCount, modifiedCount, upsertedId } = result;
        expect(isSuccess).toBe(true);
    });
});

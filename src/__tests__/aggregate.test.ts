import { initDatabase } from '../index';

it('find', async () => {
    const db = initDatabase({
        appHost: process.env.mainappHost || '',
        apiKey: process.env.mainApiKey || '',
        databaseName: process.env.mainDatabaseName || '',
    });

    const result = await db.collection('users').aggregate({
        pipeline: [
            {
                $match: {
                    userId: 'f95cfc82f512',
                },
            },
            {
                $lookup: {
                    from: 'notifications',
                    localField: 'userId',
                    foreignField: 'userId2',
                    as: 'notification',
                },
            },
            {
                $unwind: '$notification',
            },
        ],
    });

    const { isSuccess, documents } = result;
    const document = documents[0];
    expect(isSuccess).toBe(true);
    expect(document.username).toBe('marinomadie');
});

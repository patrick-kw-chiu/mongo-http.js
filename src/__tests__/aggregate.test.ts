import { initDatabase } from '../index';

it('find', async () => {
    const db = initDatabase({
        appId: process.env.mainAppId || '',
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
        ],
    });

    const { isSuccess, documents } = result;
    const document = documents[0];
    expect(isSuccess).toBe(true);
    expect(document.username).toBe('marinomadie');
});

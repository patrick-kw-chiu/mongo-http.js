import { initDatabase } from '../index';

it('find', async () => {
    const db = initDatabase({
        appId: process.env.articlesAppId || '',
        apiKey: process.env.articlesApiKey || '',
        appRegion: process.env.articlesAppRegion || '',
        databaseName: process.env.articlesDatabaseName || '',
    });

    const result = await db.collection('articles').find({
        filter: {
            $or: [{ creator: 'Patrick Chiu' }],
        },
        projection: {
            _id: 1,
            creator: 1,
            title: 1,
            pubDate: 1,
            guid: 1,
            categories: 1,
        },
    });

    const { isSuccess, documents } = result;
    expect(isSuccess).toBe(true);
    // expect(document.creator).toBe('Patrick Chiu');
    // expect(document.title).toBe('Migrating a Node.js App to Cloudflare Workers From Heroku');
    // expect(document.guid).toBe('https://medium.com/p/62c679552af');
    // expect(document.categories).toEqual(
    //     expect.arrayContaining(['web-development', 'heroku', 'nodejs', 'database', 'javascript'])
    // );
    // expect(document.isoDate).toBe(undefined);
});

it('find (error with incorrect `appId`)', async () => {
    const db = initDatabase({
        appId: process.env.articlesAppId + '-wrong' || '',
        apiKey: process.env.articlesApiKey || '',
        appRegion: process.env.articlesAppRegion || '',
        databaseName: process.env.articlesDatabaseName || '',
    });

    const result = await db.collection('articles').find({
        filter: {},
        projection: {},
    });

    const { isSuccess, error } = result;

    expect(isSuccess).toBe(false);
    expect(error).toMatch(/^cannot find app using Client App ID.*make sure to pass the region as well/);
});

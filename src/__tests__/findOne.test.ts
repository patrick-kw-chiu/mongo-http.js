import { initDatabase } from '../index';

it('findOne', async () => {
    const db = initDatabase({
        appId: process.env.appId || '',
        apiKey: process.env.apiKey || '',
        databaseName: process.env.databaseName || '',
    });

    try {
        const result = await db.collection('articles').findOne({
            filter: {
                guid: 'https://medium.com/p/62c679552af',
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

        const { document } = result;
        expect(document.creator).toBe('Patrick Chiu');
        expect(document.title).toBe('Migrating a Node.js App to Cloudflare Workers From Heroku');
        expect(document.guid).toBe('https://medium.com/p/62c679552af');
        expect(document.categories).toEqual(
            expect.arrayContaining(['web-development', 'heroku', 'nodejs', 'database', 'javascript'])
        );
        expect(document.isoDate).toBe(undefined);
    } catch (e) {
        console.log({ e });
    }
});

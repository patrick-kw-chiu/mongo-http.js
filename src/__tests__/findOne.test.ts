import { initClient, initDatabase, initCollection } from '../index';

describe('findOne', () => {
    const filter = {
        guid: 'https://medium.com/p/62c679552af',
    };
    const projection = {
        _id: 1,
        creator: 1,
        title: 1,
        pubDate: 1,
        guid: 1,
        categories: 1,
    };

    it('initClient', async () => {
        const client = initClient({
            appId: process.env.appId || '',
            apiKey: process.env.apiKey || '',
        });

        const db = client.database({
            databaseName: process.env.databaseName || '',
        });

        const result = await db.collection('articles').findOne({
            filter,
            projection,
        });

        const { isSuccess, document } = result;
        expect(isSuccess).toBe(true);
        expect(document.creator).toBe('Patrick Chiu');
        expect(document.title).toBe('Migrating a Node.js App to Cloudflare Workers From Heroku');
        expect(document.guid).toBe('https://medium.com/p/62c679552af');
        expect(document.categories).toEqual(
            expect.arrayContaining(['web-development', 'heroku', 'nodejs', 'database', 'javascript'])
        );
        expect(document.isoDate).toBe(undefined);
    });

    it('initDatabase', async () => {
        const db = initDatabase({
            appId: process.env.appId || '',
            apiKey: process.env.apiKey || '',
            databaseName: process.env.databaseName || '',
        });

        const result = await db.collection('articles').findOne({
            filter,
            projection,
        });

        const { isSuccess, document } = result;
        expect(isSuccess).toBe(true);
        expect(document.creator).toBe('Patrick Chiu');
        expect(document.title).toBe('Migrating a Node.js App to Cloudflare Workers From Heroku');
        expect(document.guid).toBe('https://medium.com/p/62c679552af');
        expect(document.categories).toEqual(
            expect.arrayContaining(['web-development', 'heroku', 'nodejs', 'database', 'javascript'])
        );
        expect(document.isoDate).toBe(undefined);
    });

    it('initCollection', async () => {
        const articlesCollection = initCollection({
            appId: process.env.appId || '',
            apiKey: process.env.apiKey || '',
            databaseName: process.env.databaseName || '',
            collectionName: 'articles',
        });

        const result = await articlesCollection.findOne({
            filter,
            projection,
        });

        const { isSuccess, document } = result;
        expect(isSuccess).toBe(true);
        expect(document.creator).toBe('Patrick Chiu');
        expect(document.title).toBe('Migrating a Node.js App to Cloudflare Workers From Heroku');
        expect(document.guid).toBe('https://medium.com/p/62c679552af');
        expect(document.categories).toEqual(
            expect.arrayContaining(['web-development', 'heroku', 'nodejs', 'database', 'javascript'])
        );
        expect(document.isoDate).toBe(undefined);
    });

    it('incorrect connection information', async () => {
        const articlesCollection = initCollection({
            appId: 'incorrect',
            apiKey: process.env.apiKey || '',
            databaseName: process.env.databaseName || '',
            collectionName: 'articles',
        });

        const result = await articlesCollection.findOne({
            filter,
            projection,
        });

        const { isSuccess } = result;
        expect(isSuccess).toBe(false);
    });

    it('incorrect connection information 2', async () => {
        const articlesCollection = initCollection({
            appId: process.env.appId || '',
            apiKey: 'incorrect',
            databaseName: process.env.databaseName || '',
            collectionName: 'articles',
        });

        const result = await articlesCollection.findOne({
            filter,
            projection,
        });

        const { isSuccess } = result;
        expect(isSuccess).toBe(false);
    });
});

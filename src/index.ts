interface InitClient {
    appId: string;
    apiKey: string;
}

interface InitDb extends InitClient {
    dbName: string;
    dataSource?: string;
}

interface InitCollection extends InitDb {
    collectionName: string;
}

interface Db {
    dbName: string;
    dataSource?: string;
}

const initCollection = ({ appId, apiKey, dbName, dataSource = 'Cluster0' }: InitCollection) => {};

const initDb = ({ appId, apiKey, dbName, dataSource = 'Cluster0' }: InitDb) => {
    const db = {
        collection: (collectionName: string) => {
            return initCollection({ appId, apiKey, dbName, dataSource, collectionName });
        },
    };
    return db;
};

const initClient = ({ appId, apiKey }: InitClient) => {
    const db = ({ dbName, dataSource }: Db) => {
        return initDb({
            appId,
            apiKey,
            dbName,
            dataSource,
        });
    };

    const client = { db };
    return client;
};

export const MonogoHttpClient = {
    initClient,
    initDb,
    initCollection,
};

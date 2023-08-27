import { InitDatabase } from './types';

import initCollection from './collection';

const initDatabase = ({ appHost, apiKey, databaseName, dataSource }: InitDatabase) => {
    const database = {
        collection: (collectionName: string) => {
            return initCollection({ appHost, apiKey, databaseName, dataSource, collectionName });
        },
    };
    return database;
};

export default initDatabase;

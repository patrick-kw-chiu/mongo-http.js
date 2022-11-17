import { InitDatabase } from './types';

import initCollection from './collection';

const initDatabase = ({ appId, apiKey, databaseName, dataSource }: InitDatabase) => {
    const database = {
        collection: (collectionName: string) => {
            return initCollection({ appId, apiKey, databaseName, dataSource, collectionName });
        },
    };
    return database;
};

export default initDatabase;

import { InitDatabase } from './types';

import initCollection from './collection';

const initDatabase = ({ appId, appRegion, apiKey, databaseName, dataSource }: InitDatabase) => {
    const database = {
        collection: (collectionName: string) => {
            return initCollection({ appId, appRegion, apiKey, databaseName, dataSource, collectionName });
        },
    };
    return database;
};

export default initDatabase;

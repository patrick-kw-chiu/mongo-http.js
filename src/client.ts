import { InitClient, Database } from './types';

import initDatabase from './database';

const initClient = ({ appId, apiKey }: InitClient) => {
    const database = ({ databaseName, dataSource }: Database) => {
        return initDatabase({
            appId,
            apiKey,
            databaseName,
            dataSource,
        });
    };

    const client = { database };
    return client;
};

export default initClient;

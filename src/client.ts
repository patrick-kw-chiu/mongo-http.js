import { InitClient, Database } from './types';

import initDatabase from './database';

const initClient = ({ appHost, apiKey }: InitClient) => {
    const database = ({ databaseName, dataSource }: Database) => {
        return initDatabase({
            appHost,
            apiKey,
            databaseName,
            dataSource,
        });
    };

    const client = { database };
    return client;
};

export default initClient;

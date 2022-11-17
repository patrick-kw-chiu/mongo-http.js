import { InitCollection, FindOne } from '../types';

import findOne from './findOne';

const initCollection = ({ appId, apiKey, databaseName, dataSource, collectionName }: InitCollection) => {
    const collectionConfig = { appId, apiKey, databaseName, dataSource, collectionName };
    const collection = {
        findOne: async ({ filter = {}, projection = {} }: FindOne) =>
            await findOne({
                ...collectionConfig,
                filter,
                projection,
            }),
    };
    return collection;
};

export default initCollection;

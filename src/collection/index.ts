import { InitCollection, FindOne, Find } from '../types';

import findOne from './findOne';
import find from './find';

const initCollection = ({ appId, apiKey, databaseName, dataSource, collectionName }: InitCollection) => {
    const collectionConfig = { appId, apiKey, databaseName, dataSource, collectionName };
    const collection = {
        findOne: async ({ filter, projection }: FindOne) =>
            await findOne({
                ...collectionConfig,
                filter,
                projection,
            }),
        find: async ({ filter, projection, sort, limit, skip }: Find) =>
            await find({
                ...collectionConfig,
                filter,
                projection,
                sort,
                limit,
                skip,
            }),
    };
    return collection;
};

export default initCollection;

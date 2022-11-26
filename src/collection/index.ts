import { InitCollection, FindOne, Find, Document } from '../types';

import findOne from './findOne';
import find from './find';
import insertOne from './insertOne';

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

        insertOne: async (document: Document) =>
            await insertOne({
                ...collectionConfig,
                document,
            }),
    };
    return collection;
};

export default initCollection;

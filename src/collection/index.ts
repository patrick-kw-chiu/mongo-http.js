import { Document } from 'bson';
import { InitCollection, FindOne, Find, UpdateOne, Aggregate } from '../types';

import findOne from './findOne';
import find from './find';
import insertOne from './insertOne';
import updateOne from './updateOne';
import aggregate from './aggregate';

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

        updateOne: async ({ filter, update, upsert }: UpdateOne) =>
            await updateOne({
                ...collectionConfig,
                filter,
                update,
                upsert,
            }),

        aggregate: async ({ pipeline }: Aggregate) => await aggregate({ ...collectionConfig, pipeline }),
    };
    return collection;
};

export default initCollection;

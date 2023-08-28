import { Document } from 'bson';
import {
    InitCollection,
    FindOne,
    Find,
    UpdateOne,
    UpdateMany,
    ReplaceOne,
    DeleteOne,
    DeleteMany,
    Aggregate,
} from '../types';

import findOne from './findOne';
import find from './find';
import insertOne from './insertOne';
import insertMany from './insertMany';
import updateOne from './updateOne';
import updateMany from './updateMany';
import replaceOne from './replaceOne';
import deleteOne from './deleteOne';
import deleteMany from './deleteMany';
import aggregate from './aggregate';

const initCollection = ({ appHost, apiKey, databaseName, dataSource, collectionName }: InitCollection) => {
    const collectionConfig = { appHost, apiKey, databaseName, dataSource, collectionName };
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

        insertMany: async (documents: Document[]) =>
            await insertMany({
                ...collectionConfig,
                documents,
            }),

        updateOne: async ({ filter, update, upsert }: UpdateOne) =>
            await updateOne({
                ...collectionConfig,
                filter,
                update,
                upsert,
            }),

        updateMany: async ({ filter, update, upsert }: UpdateMany) =>
            await updateMany({
                ...collectionConfig,
                filter,
                update,
                upsert,
            }),

        replaceOne: async ({ filter, replacement, upsert }: ReplaceOne) =>
            await replaceOne({
                ...collectionConfig,
                filter,
                replacement,
                upsert,
            }),

        deleteOne: async ({ filter }: DeleteOne) =>
            await deleteOne({
                ...collectionConfig,
                filter,
            }),

        deleteMany: async ({ filter }: DeleteMany) =>
            await deleteMany({
                ...collectionConfig,
                filter,
            }),

        aggregate: async ({ pipeline }: Aggregate) => await aggregate({ ...collectionConfig, pipeline }),
    };
    return collection;
};

export default initCollection;

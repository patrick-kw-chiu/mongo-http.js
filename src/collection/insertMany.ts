import { InitCollection, InsertMany } from '../types';

interface _InsertMany extends InitCollection, InsertMany {}
const insertMany = async ({
    appHost,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    documents = [],
}: _InsertMany) => {
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        documents,
    };
    try {
        const response = await fetch(appHost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(requestPayload),
        });
        const responseBody = await response.json();
        if (responseBody.error) {
            return { error: responseBody.error, isSuccess: false };
        }
        return { ...responseBody, error: null, isSuccess: true };
    } catch (error) {
        return { error, isSuccess: false };
    }
};

export default insertMany;

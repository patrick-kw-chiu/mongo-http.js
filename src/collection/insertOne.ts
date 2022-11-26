import { InitCollection, InsertOne } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _InsertOne extends InitCollection, InsertOne {}
const insertOne = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    document = {},
}: _InsertOne) => {
    const url = `${generateDataApiUrl(appId)}/action/insertOne`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        document,
    };
    try {
        const response = await fetch(url, {
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

export default insertOne;

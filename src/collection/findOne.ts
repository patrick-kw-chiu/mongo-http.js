import { InitCollection, FindOne } from '../types';

const getDataApiUrl = (appId: string) => `https://data.mongodb-api.com/app/${appId}/endpoint/data/v1`;

interface _FindOne extends InitCollection, FindOne {}
const findOne = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter,
    projection,
}: _FindOne) => {
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        filter,
        projection,
    };
    const response = await fetch(getDataApiUrl(appId), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey,
        },
        body: JSON.stringify(requestPayload),
    });
    const responseBody = await response.json();
    return responseBody;
};

export default findOne;

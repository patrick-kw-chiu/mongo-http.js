import { InitCollection, FindOne } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _FindOne extends InitCollection, FindOne {}
const findOne = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
    projection = {},
}: _FindOne) => {
    const url = `${generateDataApiUrl(appId)}/action/findOne`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        filter,
        projection,
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
        return responseBody;
    } catch (error) {
        return error;
    }
};

export default findOne;

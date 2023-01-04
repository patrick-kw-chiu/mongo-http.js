import { InitCollection, DeleteOne } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _DeleteOne extends InitCollection, DeleteOne {}
const deleteOne = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
}: _DeleteOne) => {
    const url = `${generateDataApiUrl(appId)}/action/deleteOne`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        filter,
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

export default deleteOne;

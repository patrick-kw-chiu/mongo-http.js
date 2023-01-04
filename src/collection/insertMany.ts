import { InitCollection, InsertMany } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _InsertMany extends InitCollection, InsertMany {}
const insertMany = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    documents = [],
}: _InsertMany) => {
    const url = `${generateDataApiUrl(appId)}/action/insertMany`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        documents,
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

export default insertMany;

import { InitCollection, DeleteMany } from '../types';

interface _DeleteMany extends InitCollection, DeleteMany {}
const deleteMany = async ({
    appHost,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
}: _DeleteMany) => {
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        filter,
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

export default deleteMany;

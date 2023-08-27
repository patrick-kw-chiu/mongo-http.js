import { InitCollection, Aggregate } from '../types';

interface _Aggregate extends InitCollection, Aggregate {}
const aggregate = async ({
    appHost,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    pipeline = [],
}: _Aggregate) => {
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        pipeline,
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

export default aggregate;

import { InitCollection, Aggregate } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _Aggregate extends InitCollection, Aggregate {}
const aggregate = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    pipeline = [],
}: _Aggregate) => {
    const url = `${generateDataApiUrl(appId)}/action/aggregate`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        pipeline,
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

export default aggregate;

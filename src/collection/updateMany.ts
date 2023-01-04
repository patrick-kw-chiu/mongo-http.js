import { InitCollection, UpdateMany } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _UpdateMany extends InitCollection, UpdateMany {}
const updateMany = async ({
    appId,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
    update = {},
    upsert = false,
}: _UpdateMany) => {
    const url = `${generateDataApiUrl(appId)}/action/updateMany`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        filter,
        update,
        upsert,
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

export default updateMany;

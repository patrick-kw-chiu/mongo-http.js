import { InitCollection, DeleteMany } from '../types';
import { getDataApiHost, handleErrorResponse } from '../utilities';

interface _DeleteMany extends InitCollection, DeleteMany {}
const deleteMany = async ({
    appId,
    appRegion,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
}: _DeleteMany) => {
    const { dataApiHost, isSuccess, error } = getDataApiHost(appId, appRegion);
    if (!isSuccess) {
        return { error, isSuccess: false };
    }

    const url = `${dataApiHost}/action/deleteMany`;
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
            return handleErrorResponse(responseBody.error);
        }
        return { ...responseBody, error: null, isSuccess: true };
    } catch (error) {
        return { error, isSuccess: false };
    }
};

export default deleteMany;

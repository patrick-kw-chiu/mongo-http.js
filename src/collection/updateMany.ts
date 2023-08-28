import { InitCollection, UpdateMany } from '../types';
import { getDataApiHost, handleErrorResponse } from '../utilities';

interface _UpdateMany extends InitCollection, UpdateMany {}
const updateMany = async ({
    appId,
    appRegion,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
    update = {},
    upsert = false,
}: _UpdateMany) => {
    const { dataApiHost, isSuccess, error } = getDataApiHost(appId, appRegion);
    if (!isSuccess) {
        return { error, isSuccess: false };
    }

    const url = `${dataApiHost}/action/updateMany`;
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
            return handleErrorResponse(responseBody.error);
        }
        return { ...responseBody, error: null, isSuccess: true };
    } catch (error) {
        return { error, isSuccess: false };
    }
};

export default updateMany;

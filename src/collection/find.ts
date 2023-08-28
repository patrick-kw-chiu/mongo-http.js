import { InitCollection, Find } from '../types';
import { getDataApiHost, handleErrorResponse } from '../utilities';

interface _Find extends InitCollection, Find {}
const find = async ({
    appId,
    appRegion,
    apiKey,
    databaseName,
    dataSource = 'Cluster0',
    collectionName,
    filter = {},
    projection = {},
    sort = {},
    limit = 1000,
    skip = 0,
}: _Find) => {
    const { dataApiHost, isSuccess, error } = getDataApiHost(appId, appRegion);
    if (!isSuccess) {
        return { error, isSuccess: false };
    }

    const url = `${dataApiHost}/action/find`;
    const requestPayload = {
        collection: collectionName,
        database: databaseName,
        dataSource,
        filter,
        projection,
        sort,
        limit,
        skip,
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

export default find;

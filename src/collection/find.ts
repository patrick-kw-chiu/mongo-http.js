import { InitCollection, Find } from '../types';
import { generateDataApiUrl } from '../utilities';

interface _Find extends InitCollection, Find {}
const find = async ({
    appId,
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
    const url = `${generateDataApiUrl(appId)}/action/find`;
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
        return responseBody;
    } catch (error) {
        return error;
    }
};

export default find;

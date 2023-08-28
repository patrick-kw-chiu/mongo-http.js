export const getDataApiHost = (appId: string, appRegion?: string) => {
    if (!appId) {
        return {
            error: 'Missing `appId`',
            isSuccess: false,
        };
    }

    const appRegionPrefix = appRegion ? appRegion + '.aws.' : '';

    return {
        dataApiHost: `https://${appRegionPrefix}data.mongodb-api.com/app/${appId}/endpoint/data/v1`,
        isSuccess: true,
    };
};

export const handleErrorResponse = (error: string) => {
    if (error.startsWith('cannot find app using Client App ID')) {
        return {
            error:
                error +
                '. ' +
                'It can only be due to missing `appRegion`. ' +
                'If you deploy Data API in a single region, ' +
                'make sure to pass the region as well e.g. us-west-2 or ap-southeast-2.',
            isSuccess: false,
        };
    }

    return { error, isSuccess: false };
};

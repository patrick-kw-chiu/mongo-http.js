import { Filter, Projection } from './mongo_types';

export interface InitClient {
    appId: string;
    apiKey: string;
}

export interface InitDatabase extends InitClient {
    databaseName: string;
    dataSource?: string;
}

export interface InitCollection extends InitDatabase {
    collectionName: string;
}

export interface Database {
    databaseName: string;
    dataSource?: string;
}

export interface FindOne {
    filter: Filter<any>;
    projection: Projection<any>;
}

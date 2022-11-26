import { Filter, Projection } from './mongo_types';
import { Sort } from './sort';
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
    filter?: Filter<any>;
    projection?: Projection<any>;
}

export interface Find {
    filter?: Filter<any>;
    projection?: Projection<any>;
    sort?: Sort;
    limit?: number;
    skip?: number;
}

export interface Document {
    [key: string]: any;
}
export interface InsertOne {
    document: Document;
}

import _initClient from './client';
import _initDatabase from './database';
import _initCollection from './collection';

export const initClient = _initClient;
export const initDatabase = _initDatabase;
export const initCollection = _initCollection;

const MonogoHttpClient = {
    initClient,
    initDatabase,
    initCollection,
};

export default MonogoHttpClient;

import initClient from './client';
import initDatabase from './database';
import initCollection from './collection';

const MonogoHttpClient = {
    initClient,
    initDatabase,
    initCollection,
};

export default MonogoHttpClient;

# mongo-http.js

## About

A thin wrapper on [Mongodb Atlas Data API](https://www.mongodb.com/docs/atlas/api/data-api/) using native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API. This library serves the usecase where TCP connections over Mongodb Atlas is not possible (e.g. Serverless functions like Cloudflare Workers and Deno), while still wanting to use similar MongoDB driver syntax.

## Table of Contents

1. [About](#about)
2. [Setup](#setup)
    1. [Get the App ID and API Key from Mongodb Atlas](#1-setup-mongodb-atlas-to-get-the-app-id-and-api-key)
    2. [Installation](#2-installation)
    3. [Initialization](#3-initialization)
3. [API](#api)
    1. [findOne](#findone-filter-projection-)
    2. [find](#find-filter-projection-sort-limit-skip-)
    3. insertOne
    4. insertMany
    5. updateOne
    6. updateMany
    7. replaceOne
    8. deleteOne
    9. deleteMany
    10. aggregate

## Setup

### 1. Setup MongoDB Atlas to get the App ID and API Key

Follow [MongoDB Atlas tutorial](https://www.mongodb.com/docs/atlas/api/data-api/#get-started).

Get the App ID here
![Screenshot 2022-11-20 at 2 25 46 PM](https://user-images.githubusercontent.com/42149082/202954159-a96c1a9c-3b4a-40e4-a342-55d1ffb491ed.png)

And Get the API Key here
![Screenshot 2022-11-20 at 2 27 12 PM](https://user-images.githubusercontent.com/42149082/202954177-8baba7c8-65ae-45fa-94b6-fa2d6e754930.png)

### 2. Installation

`npm install mongo-http --save`

### 3. Initialization

Depending on your needs, you can **_either_** initialize a client, database, or collection

#### You can initialize a client for connecting to multiple databases

```javascript
import { initClient } from 'mongo-http';

const client = initClient({
    appId: process.env.appId,
    apiKey: process.env.apiKey,
});

const db = client.database({ databaseName: process.env.databaseName });

const result = await db.collection('articles').find({
    filter: {
        $or: [{ categories: { $in: ['javascript', 'reactjs', 'nodejs', 'mongodb'] } }],
    },
});
```

#### ... Or, Initialize a database

```javascript
import { initDatabase } from 'mongo-http';

const db = initDatabase({
    appId: process.env.appId || '',
    apiKey: process.env.apiKey || '',
    databaseName: process.env.databaseName || '',
});

const result = await db.collection('articles').find({});
```

#### ... Or, Initialize a collection

```javascript
import { initDatabase } from 'mongo-http';

const articlesCollection = initCollection({
    appId: process.env.appId || '',
    apiKey: process.env.apiKey || '',
    databaseName: process.env.databaseName || '',
    collectionName: 'articles',
});

const result = await articlesCollection.find({});
```

## API

### .findOne({ filter, projection })

#### Parameter

| Parameter  | Type   | Default Value | Description                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter     | object | {}            | Object filter to query the document from the collection<br />Same syntax with [MongoDB driver filter](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/#std-label-node-fundamentals-query-document) and [Data API](https://www.mongodb.com/docs/atlas/app-services/data-api/generated-endpoints/#find-a-single-document) |
| projection | object | {}            | Object to project which fields to return<br />Same syntax with [MongoDB driver projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/)                                                                                                                                                                                |

#### Return

| Field     | Type                                      | Description                                                                             |
| --------- | ----------------------------------------- | --------------------------------------------------------------------------------------- |
| isSuccess | boolean                                   | Whether the database operation successful or not                                        |
| document  | object (when isSuccess is true)           | If a document is matched, an object is returned<br />If not matched, a null is returned |
| error     | error OR string (when isSuccess is false) | Error information                                                                       |

#### Example

```javascript
const { isSuccess, document, error } = await db.collection('articles').findOne({
    filter: {
        $or: [{ creator: 'Patrick Chiu' }, { title: 'Migrating a Node.js App to Cloudflare Workers From Heroku' }],
    },
    projection: { title: 1, creator: 1, guid: 1, categories: 1 },
});
```

### .find({ filter, projection, sort, limit, skip })

#### Parameter

| Parameter  | Type   | Default value | Description                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter     | object | {}            | Query object to filter the document from the collection<br />Same syntax with [MongoDB driver filter](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/#std-label-node-fundamentals-query-document) and [Data API](https://www.mongodb.com/docs/atlas/app-services/data-api/generated-endpoints/#find-a-single-document) |
| projection | object | {}            | Projection object to select which fields to return<br />Same syntax with [MongoDB driver projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/)                                                                                                                                                                      |
| sort       | object | {}            | Sort object to set the ordering<br />Same syntax with [MongoDB driver sort](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/sort/)                                                                                                                                                                                     |
| limit      | number | 1000          | At maximum, how many documents are returned                                                                                                                                                                                                                                                                                                                |
| skip       | number | 0             | How many documents to omit from the beginning of the list of returned documents                                                                                                                                                                                                                                                                            |

#### Return

| Field     | Type                                        | Description                                                                                                  |
| --------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| isSuccess | boolean                                     | Whether the database operation successful or not                                                             |
| documents | array of object(s) (when isSuccess is true) | If document(s) are matched, an array of object(s) is returned<br />If no matches, an empty array is returned |
| error     | error OR string (when isSuccess is false)   | Error information                                                                                            |

#### Example

```javascript
const { isSuccess, documents, error } = await db.collection('articles').find({
    filter: {
        $or: [{ categories: { $in: ['javascript', 'nodejs'] } }],
    },
    projection: { title: 1, creator: 1, guid: 1, categories: 1 },
});
```

### WIP!!!

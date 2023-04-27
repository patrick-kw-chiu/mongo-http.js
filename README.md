# mongo-http.js

## About

![mongo-http.js flow](https://github.com/patrick-kw-chiu/mongo-http.js/blob/main/assets/flow.png?raw=true)

A thin wrapper on [Mongodb Atlas Data API](https://www.mongodb.com/docs/atlas/api/data-api/) using native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API. This library serves the usecase where

-   TCP connections over Mongodb Atlas is not possible (e.g. Serverless runtime like Cloudflare Workers), while still wanting to use similar MongoDB driver syntax.
-   It can also be used in serverless runtimes which the reuse of a MongoDB connection [may not always be available](https://www.mongodb.com/developer/languages/javascript/developing-web-application-netlify-serverless-functions-mongodb/#conclusion) or [require manual caching](https://www.mongodb.com/developer/languages/javascript/integrate-mongodb-vercel-functions-serverless-experience/#conclusion)
-   Sadly, it cannot be used in the browser side yet, due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Here is a [thread](https://feedback.mongodb.com/forums/945334-atlas-app-services/suggestions/44666878-please-support-cors-from-the-data-api) to request the CORS feature

## Table of Contents

1. [About](#about)
2. [Setup](#setup)
    1. [Get the App ID and API Key from Mongodb Atlas](#1-setup-mongodb-atlas-to-get-the-app-id-and-api-key)
    2. [Installation](#2-installation)
    3. [Initialization](#3-initialization)
3. [API](#api)
    1. [findOne](#findone-filter-projection-)
    2. [find](#find-filter-projection-sort-limit-skip-)
    3. [insertOne](#insertonedocument)
    4. [insertMany](#insertmanydocuments)
    5. [updateOne](#updateone-filter-update-upsert-)
    6. [updateMany](#updatemany-filter-update-upsert-)
    7. [replaceOne](#replaceone-filter-replacement-upsert-)
    8. [deleteOne](#deleteone-filter-)
    9. [deleteMany](#deletemany-filter-)
    10. [aggregate](#aggregate-pipeline-)

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
import { initCollection } from 'mongo-http';

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

#### Example

```javascript
const { isSuccess, document, error } = await db.collection('articles').findOne({
    filter: {
        $or: [{ creator: 'Patrick Chiu' }, { title: 'Migrating a Node.js App to Cloudflare Workers From Heroku' }],
    },
    projection: { title: 1, creator: 1, guid: 1, categories: 1 },
});
```

#### Parameter

| Parameter  | Type   | Default Value | Description                                                                                                                                                                                                                                                                    |
| ---------- | ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filter     | object | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The `findOne` action returns the first document in the collection that matches this filter.<br />If you do not specify a `filter`, the action matches all document in the collection. |
| projection | object | {}            | A [MongoDB Query Projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/). Depending on the projection, the returned document will either omit specific fields or include only specified fields or values)                                 |

#### Return

| Field     | Type          | Description                                                                             |
| --------- | ------------- | --------------------------------------------------------------------------------------- |
| isSuccess | boolean       | Whether the database operation successful or not                                        |
| document  | object / null | If a document is matched, an object is returned<br />If not matched, a null is returned |
| error     | error / null  | Error information                                                                       |

### .find({ filter, projection, sort, limit, skip })

#### Example

```javascript
const { isSuccess, documents, error } = await db.collection('articles').find({
    filter: {
        $or: [{ categories: { $in: ['javascript', 'nodejs'] } }],
    },
    projection: { title: 1, creator: 1, guid: 1, categories: 1 },
    sort: { createdAt: -1 },
    limit: 50,
    skip: 100,
});
```

#### Parameter

| Parameter  | Type   | Default value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter     | object | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The find action returns documents in the collection that match this filter.<br />If you do not specify a `filter`, the action matches all document in the collection.<br />If the filter matches more documents than the specified `limit`, the action only returns a subset of them. You can use `skip` in subsequent queries to return later documents in the result set. |
| projection | object | {}            | A [MongoDB Query Projection](https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/). Depending on the projection, the returned document will either omit specific fields or include only specified fields or values)                                                                                                                                                                                                                       |
| sort       | object | {}            | A [MongoDB Sort Expression](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/). Matched documents are returned in ascending or descending order of the fields specified in the expression.                                                                                                                                                                                                                                                    |
| limit      | number | 1000          | The maximum number of matched documents to include in the returned result set. Each request may return up to 50,000 documents.                                                                                                                                                                                                                                                                                                                                       |
| skip       | number | 0             | The number of matched documents to skip before adding matched documents to the result set.                                                                                                                                                                                                                                                                                                                                                                           |

#### Return

| Field     | Type                             | Description                                                                                                  |
| --------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| isSuccess | boolean                          | Whether the database operation successful or not                                                             |
| documents | array of object(s) / empty array | If document(s) are matched, an array of object(s) is returned<br />If no matches, an empty array is returned |
| error     | error / null                     | Error information                                                                                            |

### .insertOne(document)

#### Example

```javascript
const { isSuccess, insertedId, error } = await db.collection('tags').insertOne({
    cachedAt: '2022-11-25T17:44:59.981+00:00',
    tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python'],
});
```

#### Parameter

| Parameter | Type   | Default value | Description                                                                                                             |
| --------- | ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| document  | object | {}            | An [EJSON](https://www.mongodb.com/docs/manualreference/mongodb-extended-json/) document to insert into the collection. |

#### Return

| Field      | Type         | Description                                      |
| ---------- | ------------ | ------------------------------------------------ |
| isSuccess  | boolean      | Whether the database operation successful or not |
| insertedId | string       | ID of the newly inserted document                |
| error      | error / null | Error information                                |

### .insertMany(documents)

#### Example

```javascript
const { isSuccess, insertedIds, error } = await db.collection('tags').insertMany([
    {
        date: '2022-11-01T00:00:00.000+00:00',
        tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python'],
    },
    {
        date: '2022-12-01T00:00:00.000+00:00',
        tags: ['goblin-mode', 'new-year', 'economic-crisis'],
    },
]);
```

#### Parameter

| Parameter | Type               | Default value | Description                                                                                                                                   |
| --------- | ------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| documents | array of object(s) | []            | An array of one or more [EJSON](https://www.mongodb.com/docs/manualreference/mongodb-extended-json/) documents to insert into the collection. |

#### Return

| Field       | Type               | Description                                                   |
| ----------- | ------------------ | ------------------------------------------------------------- |
| isSuccess   | boolean            | Whether the database operation successful or not              |
| insertedIds | array of string(s) | `_id` values of all inserted documents as an array of strings |
| error       | error / null       | Error information                                             |

### .updateOne({ filter, update, upsert })

#### Example

```javascript
const { isSuccess, matchedCount, modifiedCount, upsertedId, error } = await db.collection('tags').updateOne({
    filter: {
        _id: { $oid: '638199c045955b5e9701be1f' },
    },
    update: {
        date: '2022-11-25T00:00:00.000+00:00',
        tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python', 'something-else'],
    },
    upsert: true,
});
```

#### Parameter

| Parameter | Type    | Default value | Description                                                                                                                                                                                              |
| --------- | ------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | object  | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The `updateOne` action modifies the first document in the collection that matches this filter.                  |
| update    | object  | {}            | A [MongoDB Update Expression](https://www.mongodb.com/docs/manual/tutorial/update-documents/) that specifies how to modify the matched document                                                          |
| upsert    | boolean | false         | The `upsert` flag only applies if no documents match the specified `filter`. If `true`, the `updateOne` action inserts a new document that matches the filter with the specified `update` applied to it. |

#### Return

| Field         | Type         | Description                                        |
| ------------- | ------------ | -------------------------------------------------- |
| isSuccess     | boolean      | Whether the database operation successful or not   |
| matchedCount  | number       | The number of documents that the filter matched    |
| modifiedCount | number       | The number of matching documents that were updated |
| upsertedId    | string       | ID of the newly inserted document                  |
| error         | error / null | Error information                                  |

### .updateMany({ filter, update, upsert })

#### Example

```javascript
const { isSuccess, matchedCount, modifiedCount, upsertedId, error } = await db.collection('users').updateMany({
    filter: {
        lastLoginAt: { $lt: '2023-01-01' },
    },
    update: {
        isActive: false,
    },
    upsert: true,
});
```

#### Parameter

| Parameter | Type    | Default value | Description                                                                                                                                                                                               |
| --------- | ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | object  | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The `updateMany` action modifies all documents in the collection that match this filter.                         |
| update    | object  | {}            | A [MongoDB Update Expression](https://www.mongodb.com/docs/manual/tutorial/update-documents/) that specifies how to modify matched documents.                                                             |
| upsert    | boolean | false         | The `upsert` flag only applies if no documents match the specified `filter`. If `true`, the `updateMany` action inserts a new document that matches the filter with the specified `update` applied to it. |

#### Return

| Field         | Type         | Description                                        |
| ------------- | ------------ | -------------------------------------------------- |
| isSuccess     | boolean      | Whether the database operation successful or not   |
| matchedCount  | number       | The number of documents that the filter matched    |
| modifiedCount | number       | The number of matching documents that were updated |
| upsertedId    | string       | ID of the newly inserted document                  |
| error         | error / null | Error information                                  |

### .replaceOne({ filter, replacement, upsert })

#### Example

```javascript
const { isSuccess, matchedCount, modifiedCount, upsertedId, error } = await db.collection('tags').replaceOne({
    filter: {
        _id: { $oid: '638199c045955b5e9701be1f' },
    },
    replacement: {
        date: '2022-11-25T00:00:00.000+00:00',
        tags: ['startup', 'programming', 'digital-nomad', 'passive-income', 'python', 'something-else'],
    },
    upsert: true,
});
```

#### Parameter

| Parameter   | Type    | Default value | Description                                                                                                                                                                                |
| ----------- | ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| filter      | object  | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The `replaceOne` action overwrites the first document in the collection that matches this filter. |
| replacement | object  | {}            | An [EJSON](https://www.mongodb.com/docs/manualreference/mongodb-extended-json/) document that overwrites the matched document.                                                             |
| upsert      | boolean | false         | The `upsert` flag only applies if no documents match the specified `filter`. If `true`, the `replaceOne` action inserts the `replacement` document.                                        |

#### Return

| Field         | Type         | Description                                        |
| ------------- | ------------ | -------------------------------------------------- |
| isSuccess     | boolean      | Whether the database operation successful or not   |
| matchedCount  | number       | The number of documents that the filter matched    |
| modifiedCount | number       | The number of matching documents that were updated |
| upsertedId    | string       | ID of the newly inserted document                  |
| error         | error / null | Error information                                  |

### .deleteOne({ filter })

#### Example

```javascript
const { isSuccess, deletedCount, error } = await db.collection('tags').deleteOne({
    filter: {
        date: '2022-12-01T00:00:00.000+00:00',
    },
});
```

#### Parameter

| Parameter | Type   | Default value | Description                                                                                                                                                                            |
| --------- | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | object | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The `deleteOne` action deletes the first document in the collection that matches this filter. |

#### Return

| Field        | Type         | Description                                      |
| ------------ | ------------ | ------------------------------------------------ |
| isSuccess    | boolean      | Whether the database operation successful or not |
| deletedCount | number       | The number of deleted documents                  |
| error        | error / null | Error information                                |

### .deleteMany({ filter })

#### Example

```javascript
const { isSuccess, deletedCount, error } = await db.collection('tags').deleteMany({
    filter: {
        date: { $gte: '2022-12-01' },
    },
});
```

#### Parameter

| Parameter | Type   | Default value | Description                                                                                                                                                                      |
| --------- | ------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter    | object | {}            | A [MongoDB Query Filter](https://www.mongodb.com/docs/manual/tutorial/query-documents/). The `deleteMany` action deletes all documents in the collection that match this filter. |

#### Return

| Field        | Type         | Description                                      |
| ------------ | ------------ | ------------------------------------------------ |
| isSuccess    | boolean      | Whether the database operation successful or not |
| deletedCount | number       | The number of deleted documents                  |
| error        | error / null | Error information                                |

### .aggregate({ pipeline })

#### Example

```javascript
const { isSuccess, documents, error } = await db.collection('users').aggregate({
    pipeline: [
        { $match: { userId: 'f95cfc82f512' } },
        {
            $lookup: {
                from: 'notifications',
                localField: 'userId',
                foreignField: 'userId2',
                as: 'notification',
            },
        },
        { $unwind: '$notification' },
    ],
});
```

#### Parameter

| Parameter | Type             | Default value | Description                                                                                       |
| --------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| pipeline  | array of objects | []            | A [MongoDB Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/). |

#### Return

| Field     | Type                             | Description                                                                                                  |
| --------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| isSuccess | boolean                          | Whether the database operation successful or not                                                             |
| documents | array of object(s) / empty array | If document(s) are matched, an array of object(s) is returned<br />If no matches, an empty array is returned |
| error     | error / null                     | Error information                                                                                            |

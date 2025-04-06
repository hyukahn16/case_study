import weaviate from 'weaviate-client';
import { vectorizer, dataType, tokenization } from 'weaviate-client';

import data from "../data/dishwasher_admiral.json" with { type: 'json' };

const client = await weaviate.connectToLocal();
const collectionName = 'Product';

const classObject = {
    name: collectionName,
    properties: [
        {
            name: 'text',
            dataType: dataType.TEXT,
        },
        {
            name: 'description',
            dataType: dataType.TEXT,
        },
        {
            name: 'part_number',
            dataType: dataType.TEXT,
        },
        {
            name: 'manufacturer_part_number',
            dataType: dataType.TEXT,
        }
    ],
    vectorizers: [
        weaviate.configure.vectorizer.text2VecTransformers({
            name: 'title_vector',
            sourceProperties: ['title'],
        },),
    ],
};

export async function createClass() {
    // Check if the class already exists and create if not
    if (!client.collections.exists(collectionName)) {
        try {
            const response = await client.collections.create(classObject);
            console.log('Class created successfully');
        } catch (error) {
            console.error('Error creating class:', error);
        }
    }
    else {
        console.log('Class already exists');
    }
}

export async function initDatabase() {
    console.log("Initializing Database...")
    const collectionExists = await client.collections.exists(collectionName);
    if (!collectionExists) {
        console.log('Collection does not exist. Creating collection...');
        await createClass();
    }
    console.log('Collection exists. Proceeding to insert data...');
    const myCollection = await client.collections.get(collectionName)
    const response = await myCollection.data.insertMany(data.parts);
    console.log('Data inserted successfully');
}

export async function DeleteCollection() {
    await client.collections.delete(collectionName);
    console.log("Collection Deleted")
}

export async function getData() {
    const myCollection = client.collections.get(collectionName)
    const userQuery = "I need help with lower spray arm";
    let result;
    result = await myCollection.query.nearText(
        userQuery,  // The model provider integration will automatically vectorize the query
        { 
            limit: 2,
            distance: 0.35, // Max distance for vector search
        }
    )
    console.log(JSON.stringify(result.objects, null, 2));
}
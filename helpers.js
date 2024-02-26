const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);


const connect = async () => {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
        console.log(error);
    }
}

const close = () => {
    client.close();
}

const getCollection = (collection) => {
    return client.db(dbName).collection(collection);
}
//add client and save id to fields
const addClient = async (client) => {
    const collection = getCollection('Clients');
    const result = await collection.insertOne(client);
    return result.insertedId;
}

const addCompany = async (company) => {
    const collection = getCollection('Companies');
    const result = await collection.insertOne(company);
    return result.insertedId;
}

const addShipment = async (shipment) => {
    const collection = getCollection('Shipments');
    const result = await collection.insertOne(shipment);
    return result.insertedId;
}


const deleteClient = async (id) => {
    const collection = getCollection('Clients');
    await collection.deleteOne({ _id: id });
}

const deleteCompany = async (id) => {
    const collection = getCollection('Companies');
    await collection.deleteOne({ _id: id });
}

const deleteShipment = async (id) => {
    const collection = getCollection('Shipments');
    await collection.deleteOne({ _id: id });    
}


module.exports = { connect, close, getCollection, addClient, addCompany, addShipment, deleteClient, deleteCompany, deleteShipment };

const express = require('express');
const cors = require('cors'); 
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors()); 
app.use(express.json());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "Todo";

app.get('/todos', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Data');
    const data = await collection.find({}).toArray();
    res.json(data); 
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});

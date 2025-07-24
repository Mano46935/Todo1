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
   const titlesOnly = data.map(item => item.title);
res.json(titlesOnly);

});
app.post("/todos",async(req,res)=>{
await client.connect();
const db=client.db(dbName);
const collection=db.collection('Data');
const todo=req.body;
const result=await collection.insertOne(todo);
res.json({success: true,insertedId: result.insertedId });
});
app.put("/todos",async(req,res)=>{
    await client.connect();
    const db=client.db(dbName);
    const collection=db.collection("Data");

})
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});

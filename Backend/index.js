const express = require('express');
const cors = require('cors'); 
const { MongoClient, ObjectId } = require('mongodb');

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
   //const titlesOnly = data.map(item => item.title);
res.json(data);

});
app.post("/todos",async(req,res)=>{
await client.connect();
const db=client.db(dbName);
const collection=db.collection('Data');
const todo=req.body;
const result=await collection.insertOne(todo);
res.json({success: true,insertedId: result.insertedId });
});
app.put("/todos/:id",async(req,res)=>{
    await client.connect();
    const db=client.db(dbName);
    const collection=db.collection('Data');
    const {title}=req.body;
    const result = await collection.updateOne(
        {_id: new ObjectId(req.params.id)},
        {$set:{title}}
    );
    res.send({success:result.modifiedCount>0});
})
app.delete("/todos/:id",async(req,res)=>{
    await client.connect();
    const db=client.db(dbName);
    const collection=db.collection('Data');
    const result=await collection.deleteOne({_id:new ObjectId(req.params.id)});
})

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});

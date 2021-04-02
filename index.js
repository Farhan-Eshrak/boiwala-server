const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.bioxl.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(cors());



client.connect(err => {
    const collection = client.db("myDb").collection("Books");

    app.get('/books',(req,res)=>{
        collection.find()
        .toArray((err,items)=>{
           res.send(items)
        })
    })

    app.post('/admin',(req,res)=>{
        const newBook = req.body;
        console.log('adding book', newBook)
        collection.insertOne(newBook)
        .then(result=>{
            console.log('count',result.insertedCount)
            res.send(result.insertedCount>0)
        })
    })
  
});
app.get('/', (req, res) => {
    res.send('working')
})

app.listen(5000)
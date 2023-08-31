const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors')
const app = express()



app.use(cors())

app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.jaei3fj.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const databaseName = client.db('bornomanagement')
        const studentCollection = databaseName.collection('addStudent')
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        app.post('/addStudent', async (req, res) => {
            const getStudData = req.body;
            const postStuDataDb = await studentCollection.insertOne(getStudData)
            res.json(postStuDataDb);

        })

        app.get('/addStudent', async (req, res) => {
            const getStuDbData = await studentCollection.find().toArray()
            res.send(getStuDbData);
        })







        // app.post('/addStudent', async (req, res) => {
        //     const getData = req.body;
        //     const postStuData = await studentCollection.insertOne(getData)
        //     res.json(postStuData)
        //     console.log('data posted successfully');
        // })

        // app.get('/addStudent', async (req, res) => {
        //     const getStuDbData = await studentCollection.find().toArray()
        //     res.send(getStuDbData)

        // })










    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// Object is not properly initialized










app.get('/', (req, res) => {
    res.send('ki?? student add korba')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
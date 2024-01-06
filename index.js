const express = require('express')
const ObjectId = require('mongodb').ObjectId
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
        const debitcredit = databaseName.collection('debitcredit')
        const teacherCollection = databaseName.collection('addTeacher')
        const teacherPayment = databaseName.collection('listTeachePayment')
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");



        // student details section here 

        app.post('/addStudent', async (req, res) => {
            const getStudData = req.body;
            const postStuDataDb = await studentCollection.insertOne(getStudData)
            res.json(postStuDataDb);

        })

        app.get('/getAddStudent', async (req, res) => {
            const getStuDbData = await studentCollection.find().toArray()
            res.send(getStuDbData);
        })


        app.post('/debitcredit', async (req, res) => {
            const dt = req.body;
            const postdebitcreditdb = await debitcredit.insertOne(dt);
            res.json(postdebitcreditdb)
        })
        app.get('/debitcredit', async (req, res) => {
            const getdebitcreditdt = await debitcredit.find().toArray()
            res.send(getdebitcreditdt)
        })


        app.post('/addTeacher', async (req, res) => {
            const adtd = req.body;
            const postTeacherData = await teacherCollection.insertOne(adtd);
            res.json(postTeacherData)

        })
        app.get('/addTeacher', async (req, res) => {
            const getTeacherdetails = await teacherCollection.find().toArray()
            res.send(getTeacherdetails)
        })

        app.delete('/addTeacher/:id', async (req, res) => {
            const getDeletTeacehId = req.params.id;
            const deleteTeacehrquery = { _id: new ObjectId(getDeletTeacehId) }
            const deleteTeacherResult = await teacherCollection.deleteOne(deleteTeacehrquery)
            res.send(deleteTeacherResult)
            console.log(getDeletTeacehId);
        })
        // teacher payment section 

        app.post('/teacherPayment', async (req, res) => {
            const teachPayGet = req.body;
            const postTeacherPayment = await teacherPayment.insertOne(teachPayGet)
            res.json(postTeacherPayment)
            console.log(teachPayGet);
        })
        app.get('/teacherPayment', async (req, res) => {
            const getTeacherPayment = await teacherPayment.find().toArray()
            res.send(getTeacherPayment)
        })

        app.delete('/teacherPayment/:id', async (req, res) => {
            const getDeleId = req.params.id
            const deleteQuery = { _id: new ObjectId(getDeleId) }

            const deleteResult = await teacherPayment.deleteOne(deleteQuery)
            console.log(deleteResult);
            res.json(deleteResult)
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
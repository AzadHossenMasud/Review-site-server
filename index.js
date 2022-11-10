const express = require('express')
const app = express()
const port = process.env.PORT ||  5000
require('dotenv').config()
const cors = require('cors')

// 
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2kitjkk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run= async()=>{
  try{
    const serviceCollection = client.db('serviceReview').collection('services')
    const reviweCollection = client.db('serviceReview').collection('reviews')

    app.get('/services', async(req, res)=>{
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.limit(3).toArray()
      // console.log(result);
      res.send(result)
    })

    app.get('/allservices', async(req, res)=>{
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray()
      // console.log(result);
      res.send(result)
    })

    app.get('/services/:id', async(req, res)=>{
      const id = req.params.id
      const query = { _id : ObjectId(id)}
      const result = await serviceCollection.findOne(query)
      // console.log(result);
      res.send(result)
    })

    app.get('/givereview/:id', async(req, res)=>{
      const id = req.params.id
      const query = { _id : ObjectId(id)}
      const result = await serviceCollection.findOne(query)
      // console.log(result);
      res.send(result)
    })

    app.get('/reviews', async(req, res)=>{
      const courseId = req.query.courseId
      // console.log(courseId);
      const query = {courseId: courseId};
      const cursor = reviweCollection.find(query);
      const result = await cursor.toArray()
      // console.log(result);
      res.send(result)
    })

    app.get('/myreviews', async(req, res)=>{
      const email = req.query.email
      // console.log(email);
      const query = {email: email};
      const cursor = reviweCollection.find(query);
      const result = await cursor.toArray()
      // console.log(result);
      res.send(result)
    })

    app.post('/review', async(req, res)=>{
      const review = req.body
      const result = await reviweCollection.insertOne(review)
      // console.log(result)
      res.send(result)
    })

    app.delete('/review/:id', async(req, res)=>{
      const id = req.params.id
      // console.log(id)
      const query={_id: ObjectId(id)}
      const result = await reviweCollection.deleteOne(query)
      // console.log(result);
      res.send(result)

    })

    
  }
  finally{

  }
}

run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
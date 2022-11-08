const express = require('express')
const app = express()
const port = process.env.PORT ||  5000
require('dotenv').config()
const cors = require('cors')

// 
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2kitjkk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run= async()=>{
  try{
    const serviceCollection = client.db('serviceReview').collection('services')

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
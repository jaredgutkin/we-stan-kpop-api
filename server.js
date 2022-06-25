const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.DB_STRING

app.use(cors())
app.use(express.json())

MongoClient.connect(connectionString)
    .then(client =>{
        console.log('connected to database')
        const db = client.db('kpopDb')
        const infoCollection = db.collection('kpop-girl-group-db')
    

    app.get('/', (req, res)=>{
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/api/:groupName', (req, res)=>{
        const groupName = req.params.groupName.toLowerCase()
            infoCollection.find({name: groupName}).toArray()
            .then(results => {
                console.log(results)
                res.json(results[0])
            })
            .catch(error => console.error(error))
    })
})
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, ()=>{
    console.log('server is running')
})
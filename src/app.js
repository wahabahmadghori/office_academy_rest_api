const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


require('dotenv/config')

const studentsRouter = require('./routes/students')
const facultiesRouter = require('./routes/faculties')
const usersRouter = require('./routes/users')
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION_STRING)

mongoose.connection.on('error', error=>{
    console.log('Database Not Connected')   
})
mongoose.connection.on('connected', connected=>{
    console.log('Database Connected')
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/faculties', facultiesRouter)
app.use('/students', studentsRouter)
app.use('/users', usersRouter)

app.use((req, res)=>{
    res.status(404).json({
        error: "Bad request"
    })
})

module.exports = app
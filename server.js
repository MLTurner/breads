const express = require('express')
const { append } = require('express/lib/response')
const mongoose = require('mongoose')

// Requiring dotenv for port
require('dotenv').config()
const PORT = process.env.PORT
console.log(PORT)

//MongoDB Integration
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  )  

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Bread!')
})

// Listening for connections
app.listen(PORT, () => {
    console.log('nomming at port', PORT);
})
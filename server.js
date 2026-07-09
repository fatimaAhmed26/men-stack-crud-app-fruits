const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])
const dotenv =require('dotenv').config() //making .env file available 
const express =require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',() =>{
console.log(`connected to MongoDB ${mongoose.connection.name}🥭`)
})
const Fruit= require('./models/fruits.js')
app.use(morgan('div'))

app.get('/' , async (req ,res)=>{
    res.render('home.ejs')

})
app.get('/fruits', async (req,res)=>{

    res.send(createdFruit)
})

app.listen(3000, ()=>{
console.log('port 3000')
})
//=================================
// const fruitData={}
// fruitData.name ='Blueberry'
// fruitData.isReadyToEat= false
//     //use mongoose to add to the database 
//  let createdFruit =  await Fruit.create(fruitData)

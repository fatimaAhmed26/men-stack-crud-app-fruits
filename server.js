const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])
const dotenv =require('dotenv').config() //making .env file available 
const express =require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path= require('path')

const app = express()
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected',() =>{
console.log(`connected to MongoDB ${mongoose.connection.name}🥭`)
})
const Fruit= require('./models/fruits.js');
app.use(express.urlencoded({ extended: false }));
 // new code below this line
 app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('div'))
//home page
app.get('/' , async (req ,res)=>{
    res.render('home.ejs')

})
//form for creating a new fruit 
app.get('/fruits/new', async (req,res)=>{
res.render('new.ejs')
})
//post /fruits 
app.post('/fruits',async (req,res) =>{
    //
    const fruitData = {}
    // fruitData.name = req.body.name
    // fruitData.isReadyToEat = req.body.isReadyToEat
    //     res.send(req.body)
    fruitData.name = req.body.name

    if(req.body.isReadyToEat === 'on'){
        fruitData.isReadyToEat =true

    }else{
        fruitData.isReadyToEat = false
    }
    let createdFruit = await Fruit.create(fruitData)
    res.redirect('/')
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
    //find all fruits with name of mango 
    // let allBanana =  await Fruit.find({name :'Mango'})
    
    //update the fruit in the database -findOne if finding the first one 
    //let updateFruit =  await Fruit.findOneAndUpdate({name:'Mango'}, {name:'Pineapple'}, {new: true})
    // res.send(updateFruit)

    //updating by id 
    // let updateFruit =  await Fruit.findByIdAndUpdate("6a4f6a50d6295e58960779a4", {name:'Green Apply'}, {new: true})
    // res.send(updateFruit)

    // to delete somthing in the database
    // let deleteFruit =  await Fruit.findByIdAndDelete("6a4f6a50d6295e58960779a4")
    // res.send(deleteFruit)

    //find by id 
    // let findFruit =  await Fruit.findById("6a4f6c83c6990cc917e0d73f")
    // res.send(findFruit)
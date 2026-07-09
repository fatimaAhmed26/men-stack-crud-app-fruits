const express =require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('div'))

app.get('/' , async (req ,res)=>{
res.send('hello')
})

app.listen(3000, ()=>{
console.log('port 3000')
})
const express=require("express")
const { chats } = require("./data/data");
const dotenv=require("dotenv")
const connectDb =require('./config/db')
const colors=require('colors')
const userRoutes =require('./routes/userRoutes');
const { notFound,errorHandler } = require("./middleware/errorMid");

dotenv.config();
connectDb();
const app=express()
//for accepting json data
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("api is running")
})

app.get('/api/chat/',(req,res)=>{
    res.send(chats)
})

app.get('/api/chat/:id',(req,res)=>{
//    console.log(req.params.id)
   const singleChat=chats.find((c)=>c._id===req.params.id)
   res.send(singleChat)
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000

app.listen(5000, console.log(`server started on ${PORT}`.yellow.bold))
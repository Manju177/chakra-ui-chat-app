const express=require("express")

const dotenv=require("dotenv")
const connectDb =require('./config/db')
const colors=require('colors')
const userRoutes =require('./routes/userRoutes');
const chatRoutes =require('./routes/chatRoutes');
const { notFound,errorHandler } = require("./middleware/errorMid");

dotenv.config();
connectDb();
const app=express()
//for accepting json data
app.use(express.json())






app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000

app.listen(5000, console.log(`server started on ${PORT}`.yellow.bold))
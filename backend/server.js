const express=require("express")

const dotenv=require("dotenv")
const connectDb =require('./config/db')
const colors=require('colors')
const userRoutes =require('./routes/userRoutes');
const chatRoutes =require('./routes/chatRoutes');
const messageRoutes =require('./routes/messageRoutes');
const { notFound,errorHandler } = require("./middleware/errorMid");
const path = require("path");

dotenv.config();
connectDb();
const app=express()
//for accepting json data
app.use(express.json())







app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use("/api/message", messageRoutes);

const _dirname1=path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname1,'/frontend/build')))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname1,'frontend','build','index.html'))
    })

}else{
    app.get("/",(req,res)=>{
        res.send("API is Running successfully")
    });
}

app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000

const server=app.listen(5000, console.log(`server started on ${PORT}`.yellow.bold))

const io=require('socket.io')(server,{
    pingTimeOut: 60000,
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});

io.on('connection',(socket)=>{
    console.log('a user connected')
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        // console.log(userData._id)
        socket.emit("connected")
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log('user joined chat' +room)
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on('new message',(newmessageRecived)=>{
        var chat=newmessageRecived.chat;
        if(!chat.users) return console.log("chat.users not found")
        chat.users.forEach(user=>{
    if(user._id==newmessageRecived.sender._id) return;
    socket.in(user._id).emit("message recived",newmessageRecived)
})
    })
    socket.off('setup',()=>{
        console.log('user disconnected')
        socket.leave(socket._id)
    })
})
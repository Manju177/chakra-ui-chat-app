const mongoose=require('mongoose')

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(`connect to mongodb ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit();
    }

}

module.exports=connectDb;
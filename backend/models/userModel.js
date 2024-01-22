const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{type:String,default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.quora.com%2Fprofile%2FAnonymous-5306&psig=AOvVaw3185wWi1C9qxEFfqMmpkuu&ust=1705779644874000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOiK6cOa6oMDFQAAAAAdAAAAABAD"},
   
}, {timestamps:true},)

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User=mongoose.model("User",userSchema)
module.exports=User;

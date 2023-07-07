import mongoose from "mongoose";

const connectDatabase = async()=>{

    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log('database connected successfully')
    }).catch((err)=>{
        console.log(err.message)
    })
}

export default connectDatabase
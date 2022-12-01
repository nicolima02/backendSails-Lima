const mongoose = require("mongoose")

const connectionString = "mongodb://localhost:27017/ecommerce"

const initMongoDB = async ()=>{
    try{
        await mongoose.connect(connectionString)
    }catch(error){
        console.log(`ERROR: ${error}`)
        return error
    }
}

const disconnectMongo = async () =>{
    try{
        
        await mongoose.disconnect()
    }catch(error){
        console.log(`ERROR: ${error}`)
        return error
    }
}

module.exports = {initMongoDB, disconnectMongo}
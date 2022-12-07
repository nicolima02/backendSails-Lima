const mongoose = require("mongoose")
const { stringify } = require("uuid")

const prodCollection = "productos"
const carritoCollection = "carritos"
const chatCollection = "chats"

const productosSchema = new mongoose.Schema(
    {
        
            title: {type: String, require: true, max: 100},
            price: {type: Number, require:true},
            thumbnail: {type: String, require:true},
            codigo: {type: Number, require:true},
            desc: {type: String, require: true},
            stock: {type: Number, require:true},
            timestamp: {type: Number, require: true},
            cant: {type:Number, require:true}   
    }
)

const carritoSchema = new mongoose.Schema(
    {
            timestamp: {type: Number, require:true},
            productos: {type: Array, require:true}
    }
)

const chatSchema = new mongoose.Schema(
    {
        author:{type:Object, require:true,
            mail: {type:String, require:true},
            nombre: {type: String}, require:true,
            apellido: {type:String, require:true},
            edad: {type:String, require:true},
            aliass: {tpye:String, require:true},
            avatar:{type:String, require:true},
            
        },
        texto: {type:String, require:true},
        date: {type:String, require : true}
    }
)
const productoModel = mongoose.model(prodCollection, productosSchema)
const carritoModel = mongoose.model(carritoCollection, carritoSchema)
const chatModel = mongoose.model(chatCollection, chatSchema)

module.exports = {productoModel, carritoModel, chatModel}
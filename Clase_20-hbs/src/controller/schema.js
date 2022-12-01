const mongoose = require("mongoose")

const prodCollection = "productos"
const carritoCollection = "carritos"

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
const productoModel = mongoose.model(prodCollection, productosSchema)
const carritoModel = mongoose.model(carritoCollection, carritoSchema)

module.exports = {productoModel, carritoModel}
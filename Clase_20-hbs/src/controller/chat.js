// const chatoptions = require('../../options/chatDB')
// const knex = require('knex')
// const { socketEmit } = require('../services/socket')
const { default: mongoose } = require("mongoose")
const {initMongoDB, disconnectMongo} = require("../conexion.js")
const {chatModel} = require("./schema")

class chatMongo {
    async iniciarMongo(){
        await initMongoDB()
    }

    async getMessage(){
        return await chatModel.find()
    }

    async postMessage(mensaje){
        await chatModel.create(mensaje)
    }
}





module.exports = chatMongo
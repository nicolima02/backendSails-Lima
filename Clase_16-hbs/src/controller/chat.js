const chatoptions = require('../../options/chatDB')
const knex = require('knex')
const { socketEmit } = require('../services/socket')

class chat {
    constructor(config){
        this.knex = knex(config)
    }
    async createTable(){
        await this.knex.schema.dropTableIfExists('productos')
        await this.knex.schema.createTable('chat', table=>{
            table.string('date').primary(),
            table.string('user'),
            table.string('msg')
        })
    }

    async getMessage(){
        return await this.knex.from('chat').select('*')
    }

    async postMessage(mensaje){
        await this.knex('chat').insert(mensaje)
    }
}

const chatSQL = new chat(chatoptions)



module.exports = chatSQL
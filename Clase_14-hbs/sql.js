import knex from 'knex';

class ProductosSQL {
    constructor(config){
        this.knex = knex(config)
    }
    async createTable(){
        await this.knex.schema.dropTableIfExists('ecomerce')
        await this.knex.schema.createTable('ecomerce', table =>{
            table.increments('id').primary();
            table.string('title').notNullable();
            table.integer('price').notNullable();
            table.integer('codigo').notNullable();
            table.string('desc', 100).notNullable();
            table.integer('stock').notNullable()
            table.integer('timestamp');
        })
    }
}


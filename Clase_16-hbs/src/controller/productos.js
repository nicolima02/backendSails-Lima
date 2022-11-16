const fs = require('fs');
const path = require("path")
const knex = require('knex');
const options = require('../../options/db')
const file = path.resolve(__dirname, "../../productos.txt")


class ProductosSQL {
    constructor(config){
        this.knex = knex(config)
    }
    async createTable(){
        await this.knex.schema.dropTableIfExists('productos')
        await this.knex.schema.createTable('productos', table =>{
            table.increments('id').primary();
            table.string('title').notNullable();
            table.integer('price').notNullable();
            table.string('thumbnail').notNullable();
        })
    }

    async getAll(){
        return await this.knex.from('productos').select('*')
    }

    async getById(id){
        return await this.knex.from('productos').select('id').where('id', id)
    }

    async saveProduct(product){
        await this.knex('productos').insert(product)
    }

    async deleteById(id){
        await this.knex.from('productos').where('id',id).del()
    }

    async deleteAll(){
        await this.knex.from('productos').select('*').del()
    }

    async close(){
        await this.knex.destroy()
    }
}

// class Productos {
//     constructor(nombreArchivo) {
//     this.archivo = nombreArchivo;
// }

// async getData() {
//     const data = await fs.promises.readFile(this.archivo, 'utf-8'); //data = '[]'
//     return JSON.parse(data);
// }

// async saveData(data) {
//     await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'));
// }

// async save(miObjeto) {
//     const productos = await this.getData();
//     const id = (productos[productos.length-1].id)+1

//     const productoNuevo = {
//         title: miObjeto.title,
//         price: miObjeto.price,
//         thumbnail: miObjeto.thumbnail,
//         codigo: miObjeto.codigo,
//         desc: miObjeto.desc,
//         stock: miObjeto.stock,
//         timestamp: miObjeto.timestamp,
//         id
//     };

//     productos.push(productoNuevo);

//     await this.saveData(productos);

//     return productoNuevo;
// }


// async getAll() {
//     const productos = await this.getData();

//     return productos;
// }

// async deleteById(number) {
//     const productos = await this.getData();

//     const nuevoArray = productos.filter(
//         (unProducto) => unProducto.id != number
//     );

//     await this.saveData(nuevoArray);
// }

// async deleteAll() {
//     const nuevo = [];

//     await this.saveData(nuevo);
// }

// async Update(id, nuevaData) {
//     const productos = await this.getAll();

//     const indice = productos.findIndex((unProducto) => unProducto.id === id);

//     if (indice < 0) throw new Error('no existe el producto');

//     const productUpdated = {
//         id,
//         ...nuevaData,
//     };

//     productos.splice(indice, 1, productUpdated);

//     await this.saveData(productos);

//     return productUpdated;
// }
// }

// const ProductosController = new Productos('productos.txt');


module.exports = ProductosSQL;

const fs = require('fs');
const path = require("path")
const { v4: uuidv4 } = require('uuid');


const file = path.resolve(__dirname, "../../carrito.txt")
//Esto solo va a funcionar si el archivo ya existe
class Carrito {
    constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
}

async getData() {
    const data = await fs.promises.readFile(this.archivo, 'utf-8'); //data = '[]'
    return JSON.parse(data);
}

async saveData(data) {
    await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, '\t'));
}

async save(miObjeto) {
    const carrito = await this.getData();
    const id = uuidv4()
    const timestamp = Date.now()
    const carritoNuevo = {
        productos: [],
        timestamp,
        id
    };

    carrito.push(carritoNuevo);

    await this.saveData(carrito);

    return carritoNuevo;
}


async getAll() {
    const carritos = await this.getData();

    return carritos;
}

async deleteById(number) {
    const productos = await this.getData();

    const nuevoArray = productos.filter(
        (unProducto) => unProducto.id != number
    );

    await this.saveData(nuevoArray);
}

async deleteAll() {
    const nuevo = [];

    await this.saveData(nuevo);
}

async Update(id, nuevaData) {
    const productos = await this.getAll();

    const indice = productos.findIndex((unProducto) => unProducto.id === id);

    if (indice < 0) throw new Error('no existe el producto');

    const productUpdated = {
        id,
        ...nuevaData,
    };

    productos.splice(indice, 1, productUpdated);

    await this.saveData(productos);

    return productUpdated;
}
}


const CarritoController = new Carrito('carrito.txt');

module.exports = {
    CarritoController: CarritoController,
};

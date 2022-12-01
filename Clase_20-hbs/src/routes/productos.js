const {Router} = require("express")
const rutaProductos = Router()
const fs = require("fs/promises")
const path = require("path")
const producto= require("../controller/productos")
const options = require('../../options/db')
const { validarAdmin } = require('../middlewares/admin');
const { socketEmit } = require('../services/socket');


const filePath = path.resolve(__dirname, "../../productos.txt")

const ProductosController = new producto



rutaProductos.get("/", async(req,res)=>{
    ProductosController.iniciarMongo()
    const productos = await ProductosController.getAll()
    res.json({
        data:productos
    })
    
})


rutaProductos.get("/:id", async(req, res)=>{
    ProductosController.iniciarMongo()
    const id = req.params.id
    const productos = await ProductosController.getAll()
    const indice = productos.findIndex(unproducto => unproducto.id == id)

    if(indice < 0){
        return res.status(404).json(
            {
                msg: "El producto no existe"
            }
        )
    }

    res.json({
        msg:`devolviendo el producto con id ${id}`,
        data: productos[indice]
    })
    
})



rutaProductos.post("/", validarAdmin, async(req,res)=>{
    await ProductosController.iniciarMongo()
    const productos = await ProductosController.getAll()
    
    let {title, price, thumbnail, codigo, desc, stock} = req.body
    const timestamp = Date.now()
    if(!title || !price || !thumbnail|| !codigo||!desc||!stock){
        return res.status(400).json({
            msg:"campos invalidos"
        })
    }

    price = parseInt(price)
    
    const nuevoProducto = {
        title,
        price,
        thumbnail,
        codigo,
        desc,
        stock,
        timestamp
    }

    const result = await ProductosController.saveProduct(nuevoProducto)

    socketEmit("producto", nuevoProducto)

    res.json({msg:nuevoProducto})
})



rutaProductos.put("/:id",validarAdmin, async(req,res)=>{
    await ProductosController.iniciarMongo()
    const id = req.params.id
    let {title,price,thumbnail, codigo, desc, stock} = req.body
    const producto = await ProductosController.getById(id)
    const productoViejo = producto
    const timestamp = Date.now()
    const productos = await ProductosController.getAll()
    const indice = productos.findIndex(unproducto => unproducto.id == id)

    if(indice < 0){
        return res.status(404).json(
            {
                msg: "El producto no existe"
            }
        )
    }
    if(!title && !price&& !thumbnail && !codigo && !desc && !stock){
        return res.status(400).json({
            msg:"campos invalidos"
        })
    }

    
    
    if(!title){
        title = productoViejo.title
    }

    if(!price){
        price = productoViejo.price
    }
    if(!thumbnail){
        thumbnail = productoViejo.thumbnail
    }

    if(!codigo){
        codigo = productoViejo.codigo
    }
    if(!desc){
        desc = productoViejo.desc
    }
    if(!stock){
        stock= productoViejo.stock
    }

    const prodActualizado = {
        title,
        price,
        thumbnail,
        codigo,
        desc,
        stock,
        timestamp,
        id     
    }

    await ProductosController.updatear(prodActualizado)

    res.json({
        msg: `modificando producto con id: ${id}`,
        data: prodActualizado
    })
})

rutaProductos.delete("/:id", validarAdmin, async(req,res)=>{
    await ProductosController.iniciarMongo()
    const id = req.params.id
    const productos = await ProductosController.getAll()
    const indice = productos.findIndex(unproducto => unproducto.id == id)

    if(indice < 0){
        return res.status(404).json(
            {
                msg: "El producto no existe"
            }
        )
    }
    await ProductosController.deleteById(id)
    res.json({
        msg: "producto borrado"
    })
})

rutaProductos.delete("/", async (req,res)=>{
    await ProductosController.iniciarMongo()
    await ProductosController.deleteAll()
    res.json({
        msg:"Borrando todos los productos"
    })
})



module.exports = rutaProductos
const {Router} = require("express")
const rutaProductos = Router()
const fs = require("fs/promises")
const path = require("path")
const SQL= require("../controller/productos")
const options = require('../../options/db')
const { validarAdmin } = require('../middlewares/admin');
const { socketEmit } = require('../services/socket');


const filePath = path.resolve(__dirname, "../../productos.txt")

const ProductosController = new SQL(options)



rutaProductos.get("/", async(req,res)=>{
    const productos = await ProductosController.getAll()
    
    res.json({
        data:productos
    })
    
})


rutaProductos.get("/:id", async(req, res)=>{
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
    const productos = await ProductosController.getAll()

    let {title, price, thumbnail} = req.body
    // const id = (productos[productos.length-1].id)+1
    const timestamp = Date.now()
    if(!title || !price || !thumbnail){
        return res.status(400).json({
            msg:"campos invalidos"
        })
    }

    price = parseInt(price)
    
    const nuevoProducto = {
        title,
        price,
        thumbnail
    }

    const result = await ProductosController.saveProduct(nuevoProducto)

    socketEmit("producto", nuevoProducto)

    res.json({msg:nuevoProducto})

})

// rutaProductos.delete("/:id",validarAdmin, async(req,res)=>{
//     const id = req.params.id
//     const productos = await ProductosController.getAll()
//     const indice = productos.findIndex(user => user.id == id)
//     if(productos[indice]?.id){
//         productos.splice(indice, 1)
//         await ProductosController.saveData(productos)

//     res.json({
//         msg: `borrando al producto con id ${id}`,
//     })
//     }else{
//         res.status(404).json({
//             msg:"El producto no fue encontrado"
//         })
//     }

    
// })

rutaProductos.put("/:id",validarAdmin, async(req,res)=>{
    const id = req.params.id
    let {title,price,thumbnail} = req.body
    const productos = await ProductosController.getAll()
    const indice = productos.findIndex(user => user.id == id)
    if(indice < 0){
        return res.json({
            msg: "ok"
        })
    }
    const productoViejo = productos[indice]
    const timestamp = Date.now()
    if(!title && !price&& !thumbnail){
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

    const prodActualizado = {
        title,
        price,
        thumbnail,
        id: productos[indice].id
    }

    await ProductosController.deleteById(id)

    await ProductosController.saveProduct(prodActualizado)

    res.json({
        msg: `modificando producto con id: ${id}`,
        data: prodActualizado
    })
})

rutaProductos.delete("/:id", validarAdmin, async(req,res)=>{
    const id = req.params.id
    await ProductosController.deleteById(id)
})

rutaProductos.delete("/", async (req,res)=>{
    await ProductosController.deleteAll()
    res.json({
        msg:"Borrando todos los productos",
        data:nuevo
    })
})



module.exports = rutaProductos
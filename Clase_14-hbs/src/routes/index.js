const {Router} = require("express")
const productosRouter = require("./productos.js")
const rutaPrincipal = Router() 
const carritoRouter = require("./carrito.js")

rutaPrincipal.use("/productos", productosRouter)
rutaPrincipal.use("/carrito",carritoRouter)

module.exports = rutaPrincipal
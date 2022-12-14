const {Router} = require("express")
const productosRouter = require("./productos.js")
const rutaPrincipal = Router() 
const carritoRouter = require("./carrito.js")
const normalizedRouter = require("./normalized.js")


rutaPrincipal.use("/productos", productosRouter)
rutaPrincipal.use("/carrito",carritoRouter)
rutaPrincipal.use("/normalized", normalizedRouter)


module.exports = rutaPrincipal
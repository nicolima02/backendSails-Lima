const {Router} = require("express")
const productosRouter = require("./productos.js")
const rutaPrincipal = Router() 

rutaPrincipal.use("/", productosRouter)

module.exports = rutaPrincipal
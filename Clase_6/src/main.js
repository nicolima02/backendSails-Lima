const express = require("express")
const app = express()
const PORT = 8080
const Contenedor = require("./archivos.js")

const productos = new Contenedor

app.get('/productos', (req, res)=>{
    res.send(productos.getAll())
    
})

app.get('productoRandom', (req,res)=>{
    res.send("")
})

const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))
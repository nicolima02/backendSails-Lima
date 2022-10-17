const express = require("express")
const app = express()
const PORT = 8080
const Contenedor = require("./archivos.js")

const productos = new Contenedor()

app.get('/productos', async (req, res)=>{
    res.send(await productos.getAll())
})

const randomizer = async () =>{
    const listaProd = await productos.getAll()
    let i = 1
    for (let el in listaProd){
        i++
    }
    const rand = getRandomInt(0, i)
    return listaProd[rand]
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

app.get('/productoRandom', async(req, res) =>{
    res.send(await randomizer())
})


const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))
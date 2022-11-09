const server = require("./services/server.js")

const puerto = process.env.PORT || 8080

server.listen(puerto, ()=>{
    console.log(`Servidor listo escuchando en el puerto ${puerto}` )
})
const socketIo = require('socket.io');
require('dotenv').config()
// const { ProductosController } = require('../controller/productos');
const SQL = require('../controller/productos')
const options = require('../../options/db')
const chatMongo = require('../controller/chat');
const {normalize, schema} = require("normalizr")

const ChatController = new chatMongo
const ProductosController = new SQL(options)
let io;





const initWsServer = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {

    socket.on('allProducts', async () => {
        const productos = await ProductosController.getAll();
        
        productos.forEach((unProducto) => {
        socket.emit('producto', unProducto);
        });
        
    });
    socket.on("allChat", async ()=>{       
        ChatController.iniciarMongo()
        const chatCompleto = await ChatController.getMessage()
        const normalizado = (data)=>{
            
            const persona = new schema.Entity('persona',{},{
                idAttribute:'mail'
            })

            const texto = new schema.Entity('texto',{
                
            })

            const articulo = new schema.Entity('articulo', {
                autor: persona
            })
            const finalSchema = [articulo]
            const normalizedData = normalize(data, finalSchema)
            return normalizedData
}
        const normalizadata = normalizado(chatCompleto)
        
        chatCompleto.forEach((unMensaje)=>{
            socket.emit('mensaje', unMensaje)
        }) 
        socket.on("mensajeRecibido", (mensaje)=>{
            
            ChatController.iniciarMongo()
            
            ChatController.postMessage(mensaje)
            io.emit("mensajeAlChat", mensaje)
        })
    })
    });

    return io;
};

const socketEmit = (eventName, message) => {
    io.emit(eventName, message);
};

module.exports = {
    initWsServer,
    socketEmit,
};
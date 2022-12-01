const socketIo = require('socket.io');
// const { ProductosController } = require('../controller/productos');
const SQL = require('../controller/productos')
const options = require('../../options/db')
const chatSQL = require('../controller/chat')
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
        const chatCompleto = await chatSQL.getMessage()
        chatCompleto.forEach((unMensaje)=>{
            socket.emit('mensaje', unMensaje)
        })
        socket.on("mensajeRecibido", (mensaje)=>{
            chatSQL.postMessage(mensaje)
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
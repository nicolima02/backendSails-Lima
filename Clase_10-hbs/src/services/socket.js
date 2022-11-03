const socketIo = require('socket.io');
const { ProductosController } = require('../controller/productos');

let io;

const initWsServer = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {

    socket.on('allProducts', async () => {
        const productos = await ProductosController.getAll();
        productos.forEach((unProducto) => {
        socket.emit('producto', unProducto);
        });

        socket.on("mensajeRecibido", (mensaje)=>{
    
            io.emit("mensajeAlChat", mensaje)
        })
    });
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
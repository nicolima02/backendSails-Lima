const ProductosSQL = require('./productos.js')
const options = require('../../options/db')
const ChatSQL = require('./chat.js')

const ProductosController = new ProductosSQL(options)

ProductosController.createTable()
ChatSQL.createTable()
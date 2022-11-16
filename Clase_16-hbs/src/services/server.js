const express = require("express")
const mainRouter = require("../routes/index.js")
const { engine } = require("express-handlebars")
const http = require("http")
const { initWsServer } = require("./socket")
const io = require ("socket.io")
const path = require("path")
const app = express()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const viewFolderPath = path.resolve(__dirname, "../../views")
const layoutFolderPath = `${viewFolderPath}/layouts`
const partialFolderPath = `${viewFolderPath}/partials`
const defaultLayoutPath = `${layoutFolderPath}/index.hbs`
app.use("/api", mainRouter)

app.set("view engine", "hbs")
app.set("views", viewFolderPath)
app.engine("hbs", engine({
    layoutsDir: layoutFolderPath,
    extname: "hbs",
    defaultLayout: defaultLayoutPath,
    partialsDir: partialFolderPath
}))

const myHTTPServer = http.createServer(app)

const myWebsocketServer= io(myHTTPServer)

initWsServer(myHTTPServer);

myWebsocketServer.on('connection', (socket) =>{
    console.log("Se conecto un cliente")
    console.log("ID SOCKET SERVER", socket.id)
    console.log("ID SOCKET CLIENTE", socket.client.id)

    socket.on("mensajeRecibido", (mensaje)=>{
        myWebsocketServer.emit("mensajeAlChat", mensaje)
    })
})









app.get("/", async(req,res) =>{
    res.render("main", {layout: defaultLayoutPath})
})


module.exports = myHTTPServer
const express = require("express")
const mainRouter = require("../routes/index.js")
const { engine } = require("express-handlebars")
const http = require("http")
const { initWsServer, socketEmit } = require("./socket")
const io = require ("socket.io")
const path = require("path")
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const socket = io()
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const viewFolderPath = path.resolve(__dirname, "../../views")
const layoutFolderPath = `${viewFolderPath}/layouts`
const partialFolderPath = `${viewFolderPath}/partials`
const defaultLayoutPath = `${layoutFolderPath}/index.hbs`
app.use("/api", mainRouter)

const sessionConfig = {
    secret: 'thisismysecret',
    cookie:{maxAge: 60000 *10},
    saveUninitialized:true,
    resave:false
}
const mySecret = 'mySecret'
app.use(session(sessionConfig))
app.use(cookieParser(mySecret))
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


app.get("/", async(req,res) =>{
    res.render("main", {layout: defaultLayoutPath}) 
})

app.get("/login", async(req,res)=>{
    const nombre = req.session.nombre
    socket.emit("usuario", nombre)
    res.render("logged", {datos: {nombre:nombre}, layout: defaultLayoutPath}) 
})

app.post("/", async(req,res)=>{
    const {nombre} = req.body
    req.session.nombre = nombre
    res.cookie('nombre', nombre).send({proceso:'ok'})
})

app.get("/logout", (req,res)=>{
    const nombre = req.session.nombre
    res.render("logout", {datos: {nombre:nombre}, layout:defaultLayoutPath})
    req.session.destroy()
    res.redirect("/")
})


module.exports = myHTTPServer
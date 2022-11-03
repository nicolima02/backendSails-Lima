const socket = io.connect()

let form = document.getElementById("formularioAdd")
const title = document.getElementById("title")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const inputMensaje = document.querySelector(".enviarmsg")
const formChat = document.querySelector(".formulario_chat")
const inputUser = document.querySelector(".inputUser")



form.addEventListener('submit', function (ev) {
    ev.preventDefault()
    
    console.log("Se hizo click en submit")
    const producto = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
    }

    console.log(producto)
    socket.emit('envioAlServer', producto)  
    ev.target.submit()
})


formChat.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    if(inputUser.value !== ""){
        console.log("Se envio el mensaje")
        const mensaje ={
            msg: inputMensaje.value,
            user: inputUser.value,
            date: new Date().toLocaleString()
        }
        socket.emit("mensajeRecibido", mensaje)

        inputMensaje.value = ""
    }else{
        alert("tenes que poner tu nombre de usuario")
    }
})

socket.on("mensajeAlChat", mensaje=>{
    outputMsg(mensaje)
})


function outputMsg(mensaje) {  
    const div = document.createElement("div")
    div.classList.add("estructura")
    div.innerHTML = `<p id="user">${mensaje.user}</p>
    <p id="date">[${mensaje.date}]</p>
    <p id="message">:${mensaje.msg}</p>`
    document.getElementById("mensajes").appendChild(div)
}

socket.on("producto", (datos)=>{
    
    outputData(datos)
    
})

function outputData(datos){
    const div = document.createElement("div")
    div.classList.add("producto")
    div.innerHTML = `
    <h3 class="nombre">${datos.title}</h3>
    <p class="precio">$${datos.price}</p>
    <div class="img">
        <img src="${datos.thumbnail}" alt="" class="imgproducto"> 
    </div>`
    document.getElementById("prod-cont").appendChild(div)
    title.value = ""
    price.value = ""
    thumbnail.value = ""
}




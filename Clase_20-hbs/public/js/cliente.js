const socket = io()

let form = document.getElementById("formularioAdd")
const title = document.getElementById("title")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const inputMensaje = document.querySelector(".enviarmsg")
const inputNombre = document.querySelector(".inputNombre")
const inputApellido = document.querySelector(".inputApellido")
const inputEdad = document.querySelector(".inputEdad")
const inputAlias = document.querySelector(".inputAlias")
const inputAvatar = document.querySelector(".inputAvatar")
const formChat = document.querySelector(".formulario_chat")

const inputMail = document.querySelector(".inputUser")


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json',
        
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data), 
    });
    return response.json();  
    }


form.addEventListener('submit', async (ev) =>{
    ev.preventDefault()
    console.log("Se hizo click en submit")
    
    try{
        const data = {
            title: title.value,
            price: price.value,
            thumbnail: thumbnail.value
        }
        const url = 'http://localhost:8080/api/productos';
        response = await postData(url, data)   
        console.log(response)     
    }catch (err){
        console.log(err)
    }
})

socket.emit('allProducts')

formChat.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    if(inputMail.value !== ""){
        console.log("Se envio el mensaje")
        const mensaje ={
            author:{
            mail: inputMail.value,
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            edad: inputEdad.value,
            aliass: inputAlias.value,
            avatar:inputAvatar.value
            },
            texto:inputMensaje.value ,
            date: new Date().toLocaleString()
        }
        socket.emit("mensajeRecibido", mensaje)
        inputMensaje.value = ""
    }else{
        alert("tenes que poner tu nombre de usuario")
    }
})

socket.emit("allChat")

socket.on("mensaje", mensaje=>{
    outputMsg(mensaje)
})

socket.on("mensajeAlChat", mensaje=>{
    outputMsg(mensaje)
})

function outputMsg(mensaje) {  
    const div = document.createElement("div")
    div.classList.add("estructura")
    div.innerHTML = `<p id="user">${mensaje.author.mail}</p>
    <p id="date">[${mensaje.date}]</p>
    <p id="message">:${mensaje.texto}</p>
    <img src=${mensaje.author.avatar} class="imgAvatar">`
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




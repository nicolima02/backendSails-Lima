const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const { deflateSync } = require('zlib');
ruta = path.resolve(__dirname, './productos.txt');

class Contenedor{
    save(objeto){
        fs.readFile(ruta, 'utf-8', (error, contenido) =>{
            if(error){
                console.log("Hubo un error")
            }else{
                let flag = true
                const productos = JSON.parse(contenido)
    
                for (let el of productos){
                    if (el.id === objeto.id){
                        flag = false
                    }
                }       
                if (flag){
                    objeto.id = productos[productos.length-1].id + 1
                    productos.push(objeto)
                    console.log(`ID del objeto: ${objeto.id}`)
                }else{
                    console.log("Ese id ya esta siendo utilizado")
                }          
                fs.writeFile(ruta, JSON.stringify(productos), error =>{
                    if(error){
                        console.log("Hubo un error")
                    }
                })        
            }
        })
    }

    getById(Id){
        fs.readFile(ruta, 'utf-8', (error, contenido) =>{
            const productos = JSON.parse(contenido)
            if (error) {
                console.log("Hubo un error")
            }else{
                let res = "No encontrado"
                for (let el of productos){
                    if (el.id === Id){
                        res = el
                    }
                }
                console.log(res)
            }
        })
    }

    getAll(){
        fs.readFile(ruta, 'utf-8', (error, contenido) => {
            if (error){
                console.log("Hubo un error")
            }else{
                console.log(JSON.parse(contenido))
            }
            
        })
    }

    deleteByNumber(numero){        
        fs.readFile(ruta, 'utf-8', (error, contenido) => {
            if (error){
                console.log("Hubo un error")
            }else{
                let productos = JSON.parse(contenido)
                productos = productos.filter(el => el.id != numero)
                fs.writeFile(ruta, JSON.stringify(productos), error =>{
                    if(error){
                        console.log("Hubo un error")
                    }
                }) 
            }
        })
    }

    deleteAll(){
        fs.writeFile(ruta, `[]`, error =>{
            if(error){
                console.log("Hubo un error")
            }
        })
    }

}

const cont = new Contenedor

//cont.save({"title": "Cartel blanco", "price": 2000, "thumbnail": "https://neondesign.netlify.app/img/Trabajo4.jpg"})
cont.getAll();
// cont.getById(1);
//cont.deleteByNumber(4)
// cont.deleteAll()

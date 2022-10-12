const fs = require('fs');
const path = require('path');
ruta = path.resolve(__dirname, './productos.txt');


class Contenedor{
    async save(objeto){
        try {
            await fs.promises.readFile(ruta, 'utf-8')
            .then(contenido => {
                if(contenido === "[]" || contenido === ""){                
                    objeto.id = 1
                    objeto = JSON.stringify(objeto)       
                    fs.writeFileSync(ruta, `[${objeto}]`)
                    console.log(`ID del objeto: ${objeto.id}`)
                }else{
                    let productos = JSON.parse(contenido)
                    objeto.id = productos[productos.length-1].id + 1
                    productos.push(objeto)
                    productos = JSON.stringify(productos)
                    console.log(`ID del objeto: ${objeto.id}`)
                    fs.writeFileSync(ruta, `${productos}`)
                }
            })
            .catch(err =>{
                console.log("error de lectura", err)
            })
        } catch (error) {           
        }
    }

    async getById(Id){
        try{
            await fs.promises.readFile(ruta, 'utf-8')
            .then(contenido => {
                if (contenido !== "" || contenido !== "[]"){
                    const productos = JSON.parse(contenido)
                    let res = "No encontrado"
                    for (let el of productos){
                        if (el.id === Id){
                            res = el
                        }
                    }
                    console.log(res)
                }           
            })
            .catch(err => {
                console.log("error", err)
            })
        }
        catch(error){
        }
    }

    async getAll(){
        try {
            await fs.promises.readFile(ruta, 'utf-8')
            .then(contenido => {
                if(contenido !== "" || contenido !== "[]"){
                    return (JSON.parse(contenido))                               
                }else{
                    console.log("El archivo esta vacio")
                }
            })
            .catch(err => {
                console.log("error", err)
            })
        } catch (error) {
            
        }
    }

    async deleteByNumber(numero){      
        try {
            await fs.promises.readFile(ruta, 'utf-8')
            .then(contenido => {
                if(contenido !== "" || contenido !== ""){
                    let productos = JSON.parse(contenido)
                    productos = productos.filter(el => el.id != numero)
                    fs.writeFileSync(ruta, JSON.stringify(productos))
                    console.log("Se elimino el producto")
                }else{
                    console.log("El archivo esta vacio")
                }
            })
        }
        catch(error){

        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(ruta, `[]`)
            console.log("Archivos borrados")
        }
        catch(err){

        }
    }

}

const productos = new Contenedor

module.exports = Contenedor

//productos.save({"title": "Cartel blanco", "price": 2000, "thumbnail": "https://neondesign.netlify.app/img/Trabajo4.jpg"})
//productos.getAll();
//productos.getById(2);
//productos.deleteByNumber(4)
//productos.deleteAll()


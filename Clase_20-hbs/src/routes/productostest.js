const {Router} = require("express")
const rutaProductosTest = Router()
const {faker} = require("@faker-js/faker")
const titles = ["cartel 1", "cartel 2", "cartel 3", "cartel 4", "cartel 5"]
const prices = [500, 400, 300, 1200, 450]
const thumbnails = ["https://neondesign.netlify.app/img/Trabajo1.jpg", "https://neondesign.netlify.app/img/Trabajo2.jpg", "https://neondesign.netlify.app/img/Trabajo3.jpg"
, "https://neondesign.netlify.app/img/Trabajo4.jpg", "https://neondesign.netlify.app/img/Trabajo5.jpg"]

faker.locale = "es"



const devolverAleatorios = (req,res)=>{
        const respuesta = []
        
        
        for(let i = 0; i <5; i++){
            respuesta.push({
                title: faker.helpers.arrayElement(titles),
                price: faker.helpers.arrayElement(prices),
                thumbnail:faker.helpers.arrayElement(thumbnails)
            })
        }
    
    res.json({
        data:respuesta
    })
}
rutaProductosTest.get("/", devolverAleatorios)

module.exports = rutaProductosTest
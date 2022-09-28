class Usuario {
    constructor(nombre, apellido, libros, mascotas){
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
    }

    getFullName(){
        console.log(`Mi nombre es: ${this.nombre} ${this.apellido}`)
    }

    addMascota(masc){
        this.mascotas.push(masc)
    }

    countMascotas(){
        let i = 0;
        for(let el in this.mascotas){
            i ++
        }
        console.log(`${this.nombre} tiene ${i} mascotas`)
    }

    addBook(nombre,autor){
        this.libros.push({"nombre":nombre, "autor":autor})
    }

    getBookNames(){
        let nombre = []
        nombre = this.libros.map(el => (el.nombre))
        console.log(nombre)
    }
}

const persona = new Usuario("Nicolas", "Lima")

persona.getFullName()
persona.addMascota("perro")
persona.addMascota("perro2")
persona.countMascotas()
persona.addBook("aaaa", "nicolas")
persona.getBookNames()

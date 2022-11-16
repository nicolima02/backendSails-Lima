 endpoints productos:

get en /api/productos: nos devuelve todos los productos listados
get en /api/productos/id: nos devuelve el producto que pasamos por id

post en /api/productos: nos permite agregar un producto a la listados

put en /api/productos/id: nos permite modificar los atributos del producto pasado por id

delete en /api/productos/id: borra el producto con el id pasado
delete en /api/productos: borra todos los productos listados


endpoints carrito:

get en /api/carrito: nos devuelve todos los carritos listados
get en /api/carrito/id/productos: nos devuelve los productos del carrito pasado por id

post en /api/carrito: crea un carrito vacio y lo agrega a la lista
post en /api/carrito/id/productos: agrega un producto al carrito y lo modifica si este ya existe

delete en /api/carrito/id: borra un carrito y lo deja vacio
delete en /api/carrito/id/id_prod: borra un producto de un id que le pasamos por parametro

/// =========================================================================== ///
/// ============================= HENRY-COMMERCE ============================== ///
/// =========================================================================== ///

'use strict'

const { match } = require("assert")
const { log } = require("console")

let prodId = 1
let products = []
let categories = []

const CreateProduct = (name, brand, categoryId, stock) =>{
  let available = false
  if(stock>0) available=true
  const NewProduct = {
    prodId: prodId++,
    name,
    brand,
    categoryId,
    stock,
    available: available,
    reviews: [],
    rating: 0
  }
  products.push(NewProduct)
  return NewProduct
}

module.exports = {

  reset: function () {
    // No es necesario modificar esta función.
    products = []
    categories = []
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====

  addCategory: function (category) {
    // Agrega el nombre de una nueva categoría verificando que no exista anteriormente.
    // Debe retornar el string 'Categoría creada correctamente'.
    // En caso de existir, no se agrega y debe arrojar el Error 'La categoría ya existe' (ver JS throw Error)
    const NewCategory = categories.filter(categ => categ === category)
    if (NewCategory.length) throw new Error('La categoría ya existe')
    if (!NewCategory.length) {
      categories.push(category)
      return "Categoría creada correctamente"
    }
  },

  listCategories: function () {
    // Devuelve un arreglo con todas las categorías
    return categories
  },

  addProduct: function (name, brand, category, stock) {
    // Agrega un nuevo producto.
    // Si la categoría no existe (según el arreglo de categorías), no agrega el producto y arroja un Error 'La categoría ingresada no existe'
    // Inicialmente su propiedad reviews (reseñas) debe ser un arreglo vacío.
    // Va a ser necesario guardar, en su propiedad categoryId, el número (id) de la categoría y NO su nombre (que es lo que recibimos por parámetros).
    // El ID de categoría debe empezar desde 1 y no desde 0.
    // Su propiedad 'available' (disponible) debe ser un booleano (true o false) de acuerdo al stock.
    // Su propiedad rating (puntaje) será inicialmente 0.
    // Si el producto es agregado con éxito debe retornar el producto creado.
    const CheckCategory = categories.filter(categ => categ === category)
    if(!CheckCategory.length) throw new Error("La categoría ingresada no existe")
    if(CheckCategory.length){
      const id = categories.indexOf(category)+1      
      CreateProduct(name, brand, id, stock)      
    }
  },

  listProducts: function (category, fullName) {
    // Devuelve un arreglo con todos los productos.
    // Si recibe un nombre de categoría (category) como parámetro, debe filtrar sólo los productos pertenecientes a la misma.
    // Si la categoría no existe, arroja un Error 'La categoría no existe'
    // Si ADEMÁS de la categoría, también recibe un segundo parámetro (fullName) en 'true', debe devolver únicamente la denominación completa (Marca + Nombre) de los productos.
    if(category){
      const exist = categories.filter(categ => categ === category)
      if(!exist.length) throw new Error("La categoría no existe")
      let id = categories.indexOf(category) +1
      const ListOfProducts = products.filter(prod => prod.categoryId === parseInt(id))
      if(!fullName){
        return ListOfProducts
      }      
      let BrandName = []
      for (let i = 0; i < ListOfProducts.length; i++) {
        BrandName.push(ListOfProducts[i].brand + " " +ListOfProducts[i].name)
      }
      return BrandName
    }    
    return products
  },

  addReview: function (name, stars, text, user) {
    // Recibe: nombre de producto (name), cantidad estrellas dadas al producto (stars), comentario (text) y nombre del comprador (user).
    // Debe encontrar el producto que coincida con el nombre recibido (name).
    // Si no existe el producto, arroja un Error 'Producto no encontrado'
    // Si falta algún parámetro (stars, text o user) no agrega la reseña y arroja el Error 'Faltan parámetros'
    // El puntaje (stars) debe tener un rango válido entre 1 y 5 inclusive. En caso contrario no se guarda la reseña y arroja el Error 'Puntaje inválido'.
    // Debe agregar a la propiedad 'reviews' del producto (recordemos que es un arreglo), un objeto con la siguiente forma:
    // { stars: stars, text: text, user: user }
    // En caso de agregar correctamente, debe devolver el string "Reseña agregada correctamente".
    // Además debe actualizar el puntaje (rating) del producto, según el promedio de todas las reseñas obtenidas hasta el momento (stars).
    if(!stars || !text || !user) throw new Error("Faltan parámetros")
    if(stars <1 || stars >5) throw new Error ("Puntaje inválido")
    let product = products.filter(n => n.name=== name)
    if(!product.length) throw new Error("Producto no encontrado")
    console.log(product);
    let prom = 0, cant = product[0].reviews.length
    console.log("cant " + cant);
    // for (let i = 0; i < cant; i++) {
    //   prom+= product.reviews[i].parseInt(stars)     
    //   console.log("stars" + prom);
    // }
    //if (!cant===0) prom = (prom/cant)
    if (!cant===0) prom = (parseInt(stars)/cant) 
    console.log("total prom " + prom);
    const NewReviev ={
      stars: stars, 
      text: text, 
      user: user
    }    
    product[0].reviews.push(NewReviev)   
    product[0].rating = stars
    return "Reseña agregada correctamente"
  },

  getReviews: function (name) {
    // Devuelve las reseñas (reviews) de un producto en particular.
    // Si no existe el producto, arroja un Error 'Producto no encontrado.'
    // Si el producto existe pero no tiene reseñas, devuelve un arrego vacío.'
    let review = products.filter(n => n.name===name)        
    if(!review.length) throw new Error('Producto no encontrado.')    
    return review[0].reviews
  },

  getRating: function (name) {
    // Devuelve el puntaje (rating) de un producto en particular.
    // Si no existe el producto, arroja un Error 'Producto no encontrado'
    // Si no tiene reseñas, se espera que el rating sea 0.
    // Si no recibe parámetros (name) devuelve sólo el nombre de los 5 productos mejor puntuados, ordenados de mayor a menor puntaje
    if(!name){
      let ratingArr= []
      products.forEach(rating => {
        ratingArr.push(rating)
      });
      const bestRated = products.rating.sort()
      for (let i = 0; i < 4; i++) {
      }
    }
    let rating = products.filter(n => n.name===name)
    if(!rating.length) throw new Error('Producto no encontrado')
    return rating[0].rating
  }

}
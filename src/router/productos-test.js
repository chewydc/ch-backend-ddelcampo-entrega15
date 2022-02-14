//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerProductostest = new Router()
const faker = require('faker')
faker.locale = 'es'
const config = require('../config');

const CANT_PROD_DEFAULT = 5

let id = 1
function getNextId() {
    return id++
}
function creaProducto(id){
    return  {
        id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        //thumbnail: faker.image.imageUrl()
        thumbnail: `${faker.image.imageUrl()}?random=${Math.round(Math.random() * 1235)}`
      }
}

function generarNProductos(cant) {
    const productos = []
    for (let i = 0; i < cant; i++) {
        productos.push(creaProducto(getNextId()))
    }
    return productos
}

routerProductostest.get('/',async (req,res)=> {
    const cant = Number(req.query.cant) || CANT_PROD_DEFAULT
    res.json(generarNProductos(cant));
})

routerProductostest.get('*', (req, res) => {
    const { url, method } = req
    config.logger.warn(`Ruta ${method} ${url} no implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

module.exports= routerProductostest
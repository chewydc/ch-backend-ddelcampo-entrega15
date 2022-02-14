//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerProductos = new Router()
const config = require('../config');

const MESSAGEERROR = 'Producto no encontrado';

//const {optionsMongoDB} = require('../options/MongoDB')

//const ContenedorDB = require('./ContenedorMariaDB')
//const a = new ContenedorDB(optionsMariaDB,'productos')

//Uso Archivo para productos en Heroku (MARIA DB ES LOCAL)
const ContenedorArchivoProductos = require('./ContenedorArchivo')
const a = new ContenedorArchivoProductos(`./${config.credenciales.MENSAJES_FOLDER}/productos.txt`)


routerProductos.get('/',async (req,res)=> {
    res.json(await a.getAll());
})

routerProductos.get('/:id',async (req,res)=> {
    const { id } = req.params
    let b=await a.getById(id)
    if(b.length == 0) {b=MESSAGEERROR}
    res.json(b)
})

routerProductos.post('/',async (req,res)=> {
    const nuevoProducto = req.body
    res.json(`Nuevo producto ID: ${await a.save(nuevoProducto)} cargado OK!`)
    //res.redirect('/');
})

routerProductos.put('/:id',async (req,res)=> {
    const { id } = req.params
    const nuevoProducto = req.body
    let productos=await a.getById(id)
    if(productos.length == 0) {res.json(MESSAGEERROR)}
    else {
        let productos=await a.getAll()
            await a.deleteAll()
            for (let i = 0; i < productos.length; i++) {
                if(productos[i].id==id) {productos[i]=nuevoProducto}
                await a.save(productos[i]);
            }
            res.json(await a.getAll())
        } 
})

routerProductos.delete('/:id',async (req,res)=> {
    const { id } = req.params
    let b=await a.getById(id)
    if(b.length == 0) {res.json(MESSAGEERROR)}
    else  {
        await a.deleteById(id)
        res.json(`Producto ID: ${id} eliminado OK!`)
    }
})

routerProductos.get('*', (req, res) => {
    const { url, method } = req
    config.logger.warn(`Ruta ${method} ${url} no implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
  })

module.exports=routerProductos
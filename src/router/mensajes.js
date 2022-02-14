//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const {Router} = require('express')
const routerMensajes = new Router()

const ContenedorMsjs = require('./ContenedorArchivo')
const config = require('../config');

const mensajesApi = new ContenedorMsjs(`./${config.credenciales.MENSAJES_FOLDER}/${config.credenciales.MENSAJES_FILENAME}`)
//const mensajesApi = new ContenedorMsjs("./DB/mensajes.txt")

// Normalizacion
const { normalize,schema } = require('normalizr');
const authorNormalizerSchema = new schema.Entity('author',{},{
    idAttribute: 'mail'
})
const textNormalizerSchema = new schema.Entity('text',{author: authorNormalizerSchema}, {idAttribute: 'id'} )
const messagesNormalizerSchema = [textNormalizerSchema];


//-------------------------------------------
// Rutas de la api rest Mensajes
routerMensajes.get('/', async (req, res) => {
  let msjs= await mensajesApi.getAll()
  res.json(normalize(msjs, messagesNormalizerSchema, {idAttribute: 'email'}))
})
routerMensajes.post('/', async (req, res) => {
  res.json(` ${await mensajesApi.save(req.body)}!`)
})
  
routerMensajes.get('*', (req, res) => {
  const { url, method } = req
  config.logger.warn(`Ruta ${method} ${url} no implementada`)
  res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
module.exports=routerMensajes
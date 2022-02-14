//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const path  = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../credenciales.env')});

const credenciales = {

    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'xxx',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'xxx',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'xxx.mongodb.net',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'ecommerce',

    MENSAJES_FOLDER: process.env.MENSAJES_FOLDER || 'DB',
    MENSAJES_FILENAME: process.env.MENSAJES_FILENAME || 'mensajes.txt',

    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || 'keysecret'
};

let fs = require('fs');
let pinoms = require('pino-multi-stream')
let  prettyStream = pinoms.prettyStream()
let logger = pinoms({
streams: [
    {stream: prettyStream },
    {level: 'warn', stream: fs.createWriteStream('warn.log')},
    {level: 'error', stream: fs.createWriteStream('error.log')}]
})
module.exports = { credenciales, logger}
//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const { Router } = require('express')
const routerInfo = new Router()
const os = require('os')
const config = require('../config');


routerInfo.get('/', (req, res) => {
    console.log('Test Performance')

    res.json(
        {
            Arg: process.argv.slice(2),
            SO: process.platform,
            Node: process.version,
            Memoria: process.memoryUsage().rss,
            execPath: process.execPath,
            PID: process.pid,
            ProjectFolder: process.cwd(),
            NroSrv: os.cpus().length
        }
    );
})

routerInfo.get('*', (req, res) => {
    const { url, method } = req
   // config.logger.warn(`Ruta ${method} ${url} no implementada`)
    config.logger.warn(`Ruta ${method} /api/info${url} no está implementada`)
    res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})
module.exports = routerInfo
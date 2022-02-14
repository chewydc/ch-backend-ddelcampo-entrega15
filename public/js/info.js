//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------

getInfoPage() 

async function getInfoPage() {
    let info = await getInfo()
    const plantillaInfo = await buscarPlantillaInfo()
    const htmlinfo = armarHTMLinfo(plantillaInfo,info)
    document.getElementById('info').innerHTML = htmlinfo
}
function buscarPlantillaInfo() {
    return fetch('/plantillas/info.hbs')
        .then(respuesta => respuesta.text())
}
function getInfo() {
    return fetch('/api/info')
        .then(msjs => msjs.json())
}
function armarHTMLinfo(plantillaInfo,info) {
    const render = Handlebars.compile(plantillaInfo,info);
    const html = render({ info })
   return html
}
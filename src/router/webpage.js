//-------------------------------------------------------------------
// Entregable 15: Heroku
// Fecha de entrega: 14-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const express = require('express')
const {Router} = require('express')
const routerWeb = new Router()
const {userModel} = require('../options/mongoDB');
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport')
const config = require('../config');


routerWeb.use(express.json())
routerWeb.use(express.urlencoded({ extended: true }))

/******************  ROUTES  ******************/
//Estrategia Home Page
routerWeb.get('/', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile('index.html', { root: './public/home' })}
)

//Estrategia API Get User (para mostrar el nombre de usuario en plantillas login/logout)
routerWeb.get('/api/user', (req, res) => {
  res.json(req.user.username)
})

//Estrategia API Get User (para mostrar el nombre de usuario en plantillas login/logout)
const compression =require('compression')
routerWeb.get('/info', compression(), (req, res) => {
//routerWeb.get('/info', (req, res) => {
    //console.log('test performance')
    res.sendFile('info.html', { root: './public/login' })
})

// Estrategia de Login
routerWeb.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './public/login' })
})

routerWeb.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login-error', successRedirect: '/' })
)


// Estrategia de Register
routerWeb.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './public/login' })
})

routerWeb.post('/register', (req, res) => {
  const { username, password } = req.body
  userModel.register({ username: username, active: false }, password, function (err, user) {
    if (err) {
      config.logger.error(`Error al registrar el usuario #${username}`)
      res.redirect('/register-error')
    } else {
      res.redirect('/login')
    }
  })
})

// Estrategia de Register Error
routerWeb.get('/register-error', (req, res) => {
  res.sendFile('register-error.html', { root: './public/login' })
})

// Estrategia de LOGOUT
routerWeb.get('/logout-despedida', (req, res) => {
  res.sendFile('logout.html', { root: './public/login' })
})
routerWeb.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

// Estrategia de Login Error
routerWeb.get('/login-error', (req, res) => {
  res.sendFile('login-error.html', { root: './public/login' })
})

// Estrategia de Logueo ruta desconocida
routerWeb.get('*', (req, res) => {
  const { url, method } = req
  config.logger.warn(`Ruta ${method} ${url} no implementada`)
  res.status(404).send(`Ruta ${method} ${url} no está implementada`)
})

module.exports= routerWeb
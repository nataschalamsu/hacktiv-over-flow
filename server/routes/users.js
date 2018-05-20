const routes = require('express').Router()
const { userSignUp, userSignIn, userSignInFb } = require('../controllers/user.controllers')
const { welcomeEmail } = require('../controllers/email.controller')


routes
  .post('/signup', userSignUp)
  .post('/signin', userSignIn)
  .post('/sendWelcomeEmail', welcomeEmail)
  .get('/signinfb', userSignInFb)

module.exports = routes
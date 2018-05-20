const routes = require('express').Router()
const { deleteAnswer, upvoteAnswer, downvoteAnswer } = require('../controllers/post.controllers')
const { isLogin } = require('../middlewares/authentication')

routes
  .get('/upvote/:id', isLogin, upvoteAnswer)
  .get('/downvote/:id', isLogin, downvoteAnswer)
  .delete('/deleteA/:id', isLogin, deleteAnswer)
  

module.exports = routes
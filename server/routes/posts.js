const routes = require('express').Router()
const { postQuestion, postAnswer, postComment, getAllPost, deleteComment, deleteAnswer, deleteQuestion, upvoteQuestion, updateQuestion, downvoteQuestion } = require('../controllers/post.controllers')
const { isLogin, isAdmin, isUser } = require('../middlewares/authentication')

routes
  .get('/', getAllPost)
  .get('/upvote/:id', isLogin, upvoteQuestion)
  .get('/downvote/:id', isLogin, downvoteQuestion)
  .post('/addQ', isLogin, postQuestion)
  .post('/addA', isLogin, postAnswer)
  .post('/addC', isLogin, postComment)
  .delete('/deleteC/:id', isLogin, deleteComment)
  .delete('/deleteQ/:id', isLogin, deleteQuestion)
  .put('/updateQ/:id', isLogin, updateQuestion )

module.exports = routes
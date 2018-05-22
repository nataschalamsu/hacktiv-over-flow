const questions = require('../models/question.model')
const answers = require('../models/answer.model')
const comments = require('../models/comment.model')

module.exports = {
  postQuestion: (req, res) => {
    const user = req.headers.decoded.userId
    console.log("id user q ====> ", user)
    const { title, question, tag } = req.body
    const newQuestion = new questions({ user, title, question, tag })
    
    newQuestion
      .save((err, result) => {
        if (!err) {
          res
            .status(201)
            .json({
            message: 'new question has been posted',
            newPost: result
          })
        } else {
          res
            .status(400)
            .json({
              message: 'failed to post new question',
              error: err
            })
        }
      })
  },
  updateQuestion: (req, res) => {
    let { title, question, tag } = req.body
    console.log("yg di update ====>", req.body)
    questions
      .findByIdAndUpdate({
        _id: req.params.id
      }, req.body, function(err, result) {
        if (!err) {
          res
            .status(200)
            .json({
              message: 'question updated',
              updated: result
            })
        } else {
          res
            .status(400)
            .json(err)
        }
      })
  },
  postAnswer: (req, res) => {
    const idUser = req.headers.decoded.userId
    const { id, answer } = req.body
    console.log('ini id user ===> ', idUser)
    const newAnswer = new answers({ user: idUser, answer })
    console.log(req.body)
    newAnswer
      .save()
      .then(result => {
        console.log("masuk kesini", result)
        questions
          .findByIdAndUpdate({
            _id: req.body.id
          }, {
            $push: {
              answers: result._id
            }
          })
          .then(response => {
            res
              .status(200)
              .json({
                message: 'new answer has been posted',
                result: response
              })
          })
          .catch(err => {
            res
              .status(400)
              .json({
                message: 'failed to post answer',
                error: err
              })
          })
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  postComment: (req, res) => {
    const idUser = req.headers.decoded.userId
    console.log('ini id user ===> ', idUser)
    const { id, comment } = req.body
    console.log(idUser)
    const newComment = new comments({ 
      user: idUser, 
      comment })
    newComment
      .save()
      .then(result => {
        console.log('then1', result.id)
        console.log('id', req.body.id)
        answers
          .findByIdAndUpdate({
            _id: req.body.id
          }, {
            $push: {
              comments: result.id
            }
          })
          .then(response => {
            console.log('then2', response)
            res
              .status(200)
              .json({
                message: 'comment posted',
                post: response
              })
          })
          .catch(err => {
            console.log('err2', err)
            res
              .status(400)
              .json(err)
          })
      })
      .catch(err => {
        console.log('err1', err)
        res
          .status(400)
          .json(err)
      })
  },
  deleteQuestion: (req, res) => {
    questions
      .findByIdAndRemove({
        _id: req.params.id
      }, function(err, result) {
        if (!err) {
          res
            .status(200)
            .json({
              message: 'question deleted'
            })
        } else {
          res
            .status(400)
            .json(err)
        }
      })
  },
  deleteAnswer: (req, res) => {
    console.log("masuk")
    console.log("id", req.params.id)
    answers
      .findByIdAndRemove({
        _id: req.params.id
      })
      .then(result => {
        console.log("result", result)
        res
          .status(200)
          .json({
            message: 'answer deleted'
          })
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  deleteComment: (req, res) => {
    comments
      .findByIdAndRemove({
        _id: req.params.id
      })
      .then(result => {
        res
          .status(200)
          .json({
            message: 'comment deleted'
          })
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  getAllPost: (req, res) => {
    questions
      .find()
      .populate('user')
      .populate({
        path: 'answers',
        populate: [{
          path: 'comments',
          populate: {
            path: 'user'
          }
        }, {
          path: 'user'
        }]
      })
      .then(response => {
        res
          .status(200)
          .json({
            message: 'all post',
            posts: response
          })
      })
      .catch(err => {
        res
          .status(400)
          .json(err)
      })
  },
  upvoteQuestion: (req, res) => {
    let idUser = req.headers.decoded.userId
    let action = ''

    questions
      .find({
        _id: req.params.id
      })
      .populate('user')
      .exec()
      .then((result) => {
        console.log("====>", result)
        let upvote = result[0].up
        let checkUpVote = upvote.indexOf(idUser) 
        let downvote = result[0].down
        let checkDownVote = downvote.indexOf(idUser) 
        if (idUser == result[0].user.id) {
          console.log("masuk =====|", idUser)
          console.log("id result", result[0].user.role)
          res
            .status(400)
            .send({
              message: "access denied"
            })
        } else {
          if (checkDownVote !== -1) {
            res
              .status(400)
              .send({
                message: "you've been downvoted"
              })
          } else {
            if (checkUpVote !== -1) {
              action = '$pull'
            } else {
              action = '$push'
            }
          }

          questions
            .update({
              _id: req.params.id
            }, {
              [action]: {
                up: idUser
              }
            }, {
              overwrite: false
            }, function(err, response) {
              if (!err) {
                res
                  .status(200)
                  .send({
                    message: "upvoted question success"
                  })
              } else {
                res
                  .status(400)
                  .send({
                    message: "upvoted question failed"
                  })
              }
          })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send(err)
      })
  },
  downvoteQuestion: (req, res) => {
    let idUser = req.headers.decoded.userId
    let action = ''

    questions
      .find({
        _id: req.params.id
      })
      .populate('user')
      .exec()
      .then(result => {
        
        let upvote = result[0].up
        let checkUpVote = upvote.indexOf(idUser) 
        let downvote = result[0].down
        let checkDownVote = downvote.indexOf(idUser) 
        
        if (idUser == result[0].user.id) {
          console.log("masuk =====|", idUser)
          console.log("id result", result[0].user.id)
          res
            .status(400)
            .send({
              message: "access denied"
            })
        } else {
          if (checkUpVote !== -1) {
            res
              .status(400)
              .send({
                message: "you've been upvoted"
              })
          } else {
            if (checkDownVote !== -1) {
              action = '$pull'
            } else {
              action = '$push'
            }
          }

          questions
          .update({
            _id: req.params.id
          }, {
            [action]: {
              down: idUser
            }
          }, {
            overwrite: false
          }, function(err, response) {
            if (!err) {
              res
                .status(200)
                .send({
                  message: "downvoted question success"
                })
            } else {
              res
                .status(400)
                .send({
                  message: "downvoted question failed"
                })
            }
          })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send(err)
      })
  },
  upvoteAnswer: (req, res) => {
    let idUser = req.headers.decoded.userId
    let action = ''

    answers
      .find({
        _id: req.params.id
      })
      .populate('user', '_id')
      .exec()
      .then(result => {
        
        let upvote = result[0].up
        let checkUpVote = upvote.indexOf(idUser) 
        let downvote = result[0].down
        let checkDownVote = downvote.indexOf(idUser) 
        
        if (idUser == result[0].user.id) {
          console.log("masuk =====|", idUser)
          console.log("id result", result[0].user.id)
          res
            .status(400)
            .send({
              message: "access denied"
            })
        } else {
          if (checkDownVote !== -1) {
            res
              .status(400)
              .send({
                message: "you've been downvoted"
              })
          } else {
            if (checkUpVote !== -1) {
              action = '$pull'
            } else {
              action = '$push'
            }
          }

          answers
            .update({
              _id: req.params.id
            }, {
              [action]: {
                up: idUser
              }
            }, {
              overwrite: false
            }, function(err, response) {
              if (!err) {
                res
                  .status(200)
                  .send({
                    message: "upvoted answer success"
                  })
              } else {
                res
                  .status(400)
                  .send({
                    message: "upvoted answer failed"
                  })
              }
          })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send(err)
      })
  },
  downvoteAnswer: (req, res) => {
    let idUser = req.headers.decoded.userId
    let action = ''

    answers
      .find({
        _id: req.params.id
      })
      .populate('user')
      .exec()
      .then(result => {
        
        let upvote = result[0].up
        let checkUpVote = upvote.indexOf(idUser) 
        let downvote = result[0].down
        let checkDownVote = downvote.indexOf(idUser) 
        
        if (idUser == result[0].user.id) {
          console.log("masuk =====|", idUser)
          console.log("id result", result[0].user.id)
          res
            .status(400)
            .send({
              message: "access denied"
            })
        } else {
          if (checkUpVote !== -1) {
            res
              .status(400)
              .send({
                message: "you've been upvoted"
              })
          } else {
            if (checkDownVote !== -1) {
              action = '$pull'
            } else {
              action = '$push'
            }
          }

          answers
            .update({
              _id: req.params.id
            }, {
              [action]: {
                down: idUser
              }
            }, {
              overwrite: false
            }, function(err, response) {
              if (!err) {
                res
                  .status(200)
                  .send({
                    message: "downvoted question success"
                  })
              } else {
                res
                  .status(400)
                  .send({
                    message: "downvoted question failed"
                  })
              }
          })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send(err)
      })
  }
}

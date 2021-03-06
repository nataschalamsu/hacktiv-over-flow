const mongoose = require('mongoose')
const user = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  userSignUp: (req, res) => {
    
    let {
      email, 
      password
    } = req.body
    let role = req.body.role || 'user'
    let hashed = bcrypt.hashSync(password, bcrypt.genSaltSync())
    password = hashed
    let newUser = new user({  
      email, 
      password,
      role,
      welcomeEmail: true
    })
    newUser
      .save((err, result) => {
      if(err) {
        res
          .status(400)
          .json({
            message: err
          })
      } else {
        res
          .status(201)
          .json({
            newData: result
          })
      }
    })
  },
  userSignIn: (req, res) => {
    const { email, password } = req.body
    user
      .findOne({
        email: email
      }, (err, userLogin) => {
        if (err) {
          res
            .status(500)
            .send({
              message: err
            })
        } else {
          if (bcrypt.compareSync(password, userLogin.password)) {          
            let token = jwt.sign({
                        userId: userLogin.id,
                        userEmail: userLogin.email,
                        userRole: userLogin.role
                    }, process.env.SECRET)
            res
              .status(200)
              .send({
                message: 'login success',
                nowLogin: userLogin,
                token
              })
          }
        }
      })
  },
  userSignInFb: (req, res) => {
    let token = req.headers.fb_access_token
    FB.setAccessToken(token);
    FB.api('/me', {fields: ['email', 'first_name', 'name']}, function(response) {
      let {email} = response
      let password = email
      
      user
        .findOne({
          email
        }, function(err, founded){
          if (!founded) {
            bcrypt.hash(password, 10, function(err, hash) {
              if(err) {
                res
                  .status(500)
                  .json({
                    message: err
                  })
              } else {
                password = hash;
                let newUser = new user({
                    email, password
                })
                  newUser
                    .save((err, result) => {
                      if(err) {
                        res
                          .status(400)
                          .send({
                            message: err.message
                          })
                      } else {
                        let token = jwt.sign({
                          id: result._id,
                          email: result.email
                        }, process.env.SECRET)
                        res
                          .status(201)
                          .send({
                              message: 'successfully sign up',
                              data: result,
                              token: token
                          })
                      }
                    })
                }
              });
          } else {
            let token = jwt.sign({
                id: info._id,
                email: info.email
              }, process.env.SECRET)
              res
                .status(200)
                .json({
                  message: "logged in",
                  token: token,
                  id: info._id
                })
          }
      })
    })
  }
}

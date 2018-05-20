const nodemailer = require('nodemailer')
const users = require('../models/user.model')

let email = process.env.EMAIL
let pwd = process.env.PASSWORD

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${email}`,
    pass: `${pwd}`
  }
})

module.exports = {
  welcomeEmail: (req, res) => {
    users
      .find({
        welcomeEmail: true
      })
      .then(allUser => {
        allUser.forEach(founded => {
          let config = {
            from: `${email}`,
            to: founded.email,
            subject: 'Welcome to HacktivOverflow',
            text: `Welcome and Thank you for joining us :)`
          }
          transporter.sendMail(config, function(err, notif) {
            if (!err) {
              console.log('welcome has been sent')
              console.log(notif)
            } else {
              console.log(err)
            }
          })

          users
            .findByIdAndUpdate({
              _id: founded.id
            }, {
              welcomeEmail: false
            })
            .then(response => {
              res
                .status(200)
                .send({
                  message: 'welcome email has been sent',
                  notification: response
                })
            })
            .catch(err => {
              res
                .status(400)
                .send({
                  message: 'failed to send welcome email',
                  notification: err
                })
            })
        })
      })
  }
}
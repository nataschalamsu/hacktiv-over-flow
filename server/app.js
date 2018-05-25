require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors')

const db = mongoose.connection
mongoose.connect('mongodb://admin:admin@ds057862.mlab.com:57862/hacktiv-overflow');

const users = require('./routes/users')
const posts = require('./routes/posts')
const answers = require('./routes/answers')

const cron = require('cron');
const axios = require('axios');

const { welcomeEmail } = require('./controllers/email.controller')

const sendEmail = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    axios
      .post('https://hacktivoverflow.herokuapp.com/users/sendWelcomeEmail')
      .then(response => {
        console.log('email sent')
      })
      .catch(err => {
        console.log(err)
      })
  },
  start: false,
  timeZone: 'Asia/Jakarta'
});

sendEmail.start(); // job 1 started
 
console.log('sendEmail status', sendEmail.running); 

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('*****mongoose connected*****');
});

app.use('/users', users)
app.use('/posts', posts)
app.use('/answers', answers)

app.listen(3000, (connect => {
  console.log('==================connected========================')
}))
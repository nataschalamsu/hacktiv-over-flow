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
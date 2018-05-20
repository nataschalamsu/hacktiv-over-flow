const cron = require('cron');
const axios = require('axios');

const { welcomeEmail } = require('./controllers/email.controller')

const sendEmail = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    axios
      .post('http://localhost:3000/users/sendWelcomeEmail')
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
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sursusserviceandhelp@gmail.com',
    pass: 'lfosnbvixioirsht'
  }
});

let firstAlert = {
  from: 'sursusserviceandhelp@gmail.com',
  to: 'isaiah.bell.h@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


const sendEmail = function(emailParams) {
    console.log("Sending")
setTimeout(() => {
transporter.sendMail(emailParams, function(error, info){
    console.log("Sending Mail")
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
return
}, "1000")
return
}

module.exports = { sendEmail }



var nodemailer = require('nodemailer');
const { authEmailConfig } = require("../../config/config")


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: authEmailConfig,
    tls: {
        rejectUnauthorized: false
    }
});

var mailOptionsHtml = {
    from: 'youremail@gmail.com',
    to: '',
    subject: '',
    html: ''
};
var mailOptions = {
    from: 'youremail@gmail.com',
    to: '',
    subject: '',
    text : ''
};


module.exports = {
hostname: "hrm.mmcgbl.com",
// hostname: "localhost:3000",
    sendVerificationEmail: (to, subject, body) => {
        return new Promise((reslove, reject) => {
            mailOptionsHtml.to = to
            mailOptionsHtml.subject = subject
            mailOptionsHtml.html = body
            // mailOptionsHtml.html = `<h1>Welcome</h1><a href="http://localhost:3000/auth/verifyUser?email=${to}">Click here to verify your account.</a>`
            transporter.sendMail(mailOptionsHtml, (error, info) => {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    
                    reslove('Email sent: ' + info.response);
                }
            })
        })
    },
    sendPasswordRecover : (to , subject, body) => {
        return new Promise((reslove,reject)=>{
             mailOptions.to =to
             mailOptions.subject= subject
             mailOptions.text = body
             transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error)
                } else {
                    reslove('Email sent: ' + info.response);
                }
            })

        })

    }

    
}
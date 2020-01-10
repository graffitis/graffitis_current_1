const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const keys = require('./../config/keys');
const Admin = require('./../models/Admin');

exports.mail = async (userID, subject, body) => {
  let user;
  Admin.findById(userID, (err, data) => {
    if (err) throw err;
    user = data;
  });

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtps.aruba.it',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: keys.mail.user, // generated ethereal user
      pass: keys.mail.psw // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Reparto Tecnico Graffitis" <leonardo.viada@itiscuneo.eu>', // sender address
    to: user.email, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: body // html body
  });

  console.log('Messagge Sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

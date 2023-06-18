const nodemailer = require("nodemailer");

/**
 * Send Email From a testing account
 */

const sendTestEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  //config ethereal mail service
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com, tebecheri10@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  };

  //Send Email
  transporter
    .sendMail(message)
    .then((info) =>
      res.status(201).json({
        msg: "you shoud receive an email",
        msgId: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      })
    )
    .catch((error) => res.status(500).json({ error: error }));
};

/**
 * Send Emails from a Real account
 */

const sendRealEmail = (req, res) => {
  const { receiverEmail, subject, htmlText } = req.body;

  //config gmail service
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: subject,
    html: htmlText,
  };

  //Send Email
  transporter
    .sendMail(message)
    .then((info) =>
      res.status(201).json({
        msg: "you shoud receive an email",
        msgId: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      })
    )
    .catch((error) => res.status(500).json({ error: error }));
};

module.exports = {
  sendTestEmail,
  sendRealEmail,
};

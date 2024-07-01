const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMail = (req, res) => {

  //assuming we get a userMail and name from the body when sending the request
  const { userMail, name } = req.body;

  //config details which is passesd when creating the transporter.
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  //initializing tranporter using createTransport in nodemailer.
  let transporter = nodemailer.createTransport(config);

  //template for generating mail content
  let MAilGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Your_Name",
      link: "https://your_link/",
    },
  });

  let email = {
    body: {
      name: name,
      intro: "Welcome to Email Verification! We're very excited to verify your account!!!.",
      action: {
        instructions: "To get started with verifivation, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: "https://paste_the_link_to_where_you_want_to_redirect",
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  //generating the email with the above details by passing it to MailGenerator
  let emailBody = MAilGenerator.generate(email);

  let message = {
    from: process.env.EMAIL,
    to: userMail,
    subject: "Email Verification",
    //passing the emailBody as the html
    html: emailBody,
  };

  //sending the mail using sendMail by passing the above message
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        message: "Email sent successfully",
      });
    })
    .catch((error) => {
      return res.status(501).json({
        error,
      });
    });
};

module.exports = {
  sendMail,
};

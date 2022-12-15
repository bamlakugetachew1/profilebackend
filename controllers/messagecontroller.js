require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const messagesmodel = mongoose.model("messages");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
   auth: {
     user: 'abuyegetachew2@gmail.com',
    pass: process.env.PASS
  },
     tls: {
          rejectUnauthorized: false
      }
  
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "98732ba2891cb4",
//     pass: "fdbc2be0cb63da"
//   }
  
  
  
});

const router = express.Router();
router.post("/addmessages", async (req, res) => {
       
   var mailOptions = {
    from: req.body.useremail,
    to: 'abuyegetachew2@gmail.com',
    subject: 'Sending email from profile',
    text: req.body.messages
  };
    
  const messages = new messagesmodel({
    username: req.body.username,
    useremail: req.body.useremail,
    messages:req.body.messages

  });
    await  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
  
  await messages
    .save()
    .then((data) => {
      
      
      res.json({
        message: 1,
        data:data,
      });

  


    })
    .catch((error) => {
      res.send(err);
    });
});


  router.get("/download", function (req, res) {
    res.download("./cv/image.pdf" , function (err) {
    if (err) {
      console.log(err);
    }
   });
  });

  router.get("/allmessages", async (req, res) => {
    messagesmodel
      .find().select({username: 1,useremail:1,
messages:1, _id: 0 })
      .then((response) => {
        res.json({
          data: response,
        });
      })
      .catch((error) => {
        res.send(error);
      });
     });


module.exports = router

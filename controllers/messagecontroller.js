require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const messagesmodel = mongoose.model("messages");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
//    port: 587,
   secure: true,
  auth: {
    user: 'abuyegetachew2@gmail.com',
    pass: 'qmplabjcmtvvutdi'
  },
     tls: {
          rejectUnauthorized: false
      }
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
          res.send(error);
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


module.exports = router

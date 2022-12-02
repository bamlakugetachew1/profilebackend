require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
// app.use('/messages',messagesmodelcontrollers);
app.use('/messages',messagescontrollers);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongourl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
  console.log("app listing on port 3000 if port 5000 is free");
});
})

const connection = require("./models/connection");
const messagescontrollers = require("./controllers/messagecontroller");





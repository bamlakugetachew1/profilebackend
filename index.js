require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyparser = require("body-parser");
const connection = require("./models/connection");
const messagescontrollers = require("./controllers/messagecontroller");
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

app.listen(process.env.PORT || 5000, () => {
  console.log("app listing on port 3000 if port 5000 is free");
});


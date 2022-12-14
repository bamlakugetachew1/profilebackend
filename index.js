require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const cluster = require("cluster");
const os = require("os");
const numcpu = os.cpus().length;

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use("/cv", express.static("cv"));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

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
  if (cluster.isMaster) {
  for (let i = 0; i < numcpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(process.pid);
  app.listen(process.env.PORT || 5000, (err) => {
    if (!err) {
      console.log(numcpu);
      console.log(`app is running at ${process.env.PORT}`);
    }
  });
}
  
  
  
  
})

// load.io test
app.get("/loaderio-d48be8375b49b91c30e0e8046eeed4e5.txt", async (req, res) => {
    
  res.download("./cv/loaderio-d48be8375b49b91c30e0e8046eeed4e5.txt" , function (err) {
    if (err) {
      console.log(err);
    }
   });
});


const connection = require("./models/connection");
const messagescontrollers = require("./controllers/messagecontroller");
app.use('/messages',messagescontrollers);






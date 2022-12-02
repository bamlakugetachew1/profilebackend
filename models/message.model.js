const mongoose = require("mongoose");
const databaseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  messages:{
     type:String,
     require:true
  },
},
 {timestamps:true}
);
mongoose.model("messages", databaseSchema);

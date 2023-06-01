const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
     name:{
        type:String,
        default:""
    },
    phone:{
        type:String,
        default:""
    }
  })
const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;



const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    //required : true
    default: "",
  },

  longitude: {
    type: Number,
    default:""
  },
  latitude: {
    type: Number,
    default:"" 
   },

  member: {
    type: Number,
    default: 0,
  },
});

const location = mongoose.model("location", locationSchema);

module.exports = location;

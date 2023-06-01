const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;

const activitySchema = mongoose.Schema({
user : {
    type:objectid,
    ref:"userProfile"
  },
  comment:{
    type:String,
    default:""
  },
  
});
const cityModel = mongoose.model("activity", activitySchema);

module.exports = cityModel;

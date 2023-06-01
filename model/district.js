const mongoose = require("mongoose");

const districtSchema = mongoose.Schema({
  district : {
    type:String
  },
});
const districtModel = mongoose.model("district", districtSchema);

module.exports = districtModel;

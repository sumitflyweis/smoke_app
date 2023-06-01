const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  state : {
    type:String
  },
});
const cityModel = mongoose.model("state", stateSchema);

module.exports = cityModel;

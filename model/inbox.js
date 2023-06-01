const mongoose = require("mongoose");

const inboxSchema = mongoose.Schema({
  a: {
    type:String
  },
});
const districtModel = mongoose.model("inbox", inboxSchema);

module.exports = districtModel;

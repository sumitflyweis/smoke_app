const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProfile",
  },
  subscriptionStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);

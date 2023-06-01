const mongoose = require("mongoose");

const quesSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProfile",
  },
  question: {
    type: String,
    default: "",
    required: true,
  },
  option_1: {
    type: String,
    default: "",
  },
  option_2: {
    type: String,
    default: "",
  },
  option_3: {
    type: String,
    default: "",
  },
  option_4: {
    type: String,
    default: "",
  },

  selectedBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userProfile",
      },
      optionChoose: {
        type: String,
        default: "",
      },
    },
  ],

  option_1Count: {
    type: Number,
    default: 0,
  },
  option_2Count: {
    type: Number,
    default: 0,
  },
  option_3Count: {
    type: Number,
    default: 0,
  },
  option_4Count: {
    type: Number,
    default: 0,
  },
});

const quesModel = mongoose.model("questionAnswer", quesSchema);

module.exports = quesModel;

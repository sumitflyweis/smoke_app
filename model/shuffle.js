
const mongoose = require("mongoose");

const quesSchema = mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questionAnswer",
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
    },
  ],
  selectedBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userProfile",
      },
      optionChoose: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contact",
      },
    },
  ],
  optionCounts: [
    {
      option: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contact",
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const quesModel = mongoose.model("questionAnswer", quesSchema);

module.exports = quesModel;

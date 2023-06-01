const mongoose = require("mongoose");

const userAnswerSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questionAnswer",
    required: true,
  },
  optionChoose: {
    type: String,
    default: "",
  },
});

const userSchema = mongoose.Schema({
  // Your existing user schema fields
  // ...

  userAnswers: [userAnswerSchema],
  coins: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("userProfile", userSchema);

module.exports = userModel;

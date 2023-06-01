const Question = require("../model/questionAnswer");
const contactModel = require("../model/contactlist");

exports.updateOptions = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { optionIds } = req.body;

    // Retrieve the question by its ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // const options = await contactModel.find({ _id: { $in: optionIds } });
    const options = await contactModel.findById({
      _id: optionIds /*{ $in: optionIds }*/,
    });

    console.log(options);
    // Update the name in the specified option
    if (req.body.option === "option_1") {
      question.option_1 = options.name;
    } else if (req.body.option === "option_2") {
      question.option_2 = options.name;
    } else if (req.body.option === "option_3") {
      question.option_3 = options.name;
    } else if (req.body.option === "option_4") {
      question.option_4 = options.name;
    } else {
      return res.status(400).json({ message: "Invalid option specified" });
    }

    const updatedQuestion = await question.save();

    res.json({ question: updatedQuestion });
  } catch (error) {
    console.error("Error updating question options:", error);
    res.status(500).json({ message: "Failed to update question options" });
  }
};

exports.createQuestion = async (req, res) => {
  const { userID, question, option_1, option_2, option_3, option_4 } = req.body;

  // Validate input
  if (
    !userID ||
    !question ||
    !option_1 ||
    !option_2 ||
    !option_3 ||
    !option_4
  ) {
    return res
      .status(400)
      .json({ error: "Question, options 1-4 are required." });
  }

  try {
    // Create a new question object
    const newQuestion = new Question({
      userID,
      question,
      option_1,
      option_2,
      option_3,
      option_4,
    });

    // Save the question to the database
    const savedQuestion = await newQuestion.save();

    return res.status(201).json(savedQuestion);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the question." });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    return res.json({ msg: questions });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the questions." });
  }
};

// Controller action for getting a question by ID
exports.getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
    return res.json({ msg: question });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the question." });
  }
};

// Controller action for updating a question
exports.updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { userID, question, option_1, option_2, option_3, option_4 } = req.body;

  // Validate input
  if (
    !userID ||
    !question ||
    !option_1 ||
    !option_2 ||
    !option_3 ||
    !option_4
  ) {
    return res
      .status(400)
      .json({ error: "Question, options 1-4 are required." });
  }

  try { 
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { userID, question, option_1, option_2, option_3, option_4 },
      { new: true } // Return the updated question
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }

    return res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the question." });
  }
};

// Controller action for deleting a question
exports.deleteQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndRemove(questionId);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }
    return res.sendStatus(204); // No content
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the question." });
  }
};


exports.optionIndex = async (req, res) => {
  const { questionId, optionIndex } = req.params;
  const { userId } = req.body;

  try {
    // Find the question by ID
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Validate option index
    if (optionIndex < 1 || optionIndex > 4) {
      return res.status(400).json({ error: "Invalid option index." });
    }

    // Find the selected option and increment its count
    const optionCountField = `option_${optionIndex}Count`;
    question[optionCountField] += 1;

    // Update the selectedBy array with the user selection
    question.selectedBy.push({ userId, optionChoose: optionIndex });

    // Save the updated question
    await question.save();

    return res.json(question);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the question." });
  }
};

const quesModel = require('../model/shuffle'); // Assuming the model file is in the same 

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const { question, options } = req.body;

    const newQuestion = new quesModel({
      question,
      options,
    });

    const savedQuestion = await newQuestion.save();

    res.json({ question: savedQuestion });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Failed to create question' });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await quesModel.find();

    res.json({ questions });
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ message: 'Failed to retrieve questions' });
  }
};

// Update a question by ID
exports.updateQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { question, options } = req.body;

    const updatedQuestion = await quesModel.findByIdAndUpdate(
      questionId,
      { question, options },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ question: updatedQuestion });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Failed to update question' });
  }
};




// Get question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await quesModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ question });
  } catch (error) {
    console.error('Error retrieving question:', error);
    res.status(500).json({ message: 'Failed to retrieve question' });
  }
};

// Delete question by ID
exports.deleteQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await quesModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.remove();

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Failed to delete question' });
  }
};



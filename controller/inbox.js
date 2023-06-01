const User = require('../model/login');
const Question = require('../model/questionAnswer');


exports.femaleSelectedmale = async (req, res) => {

  try {
    const { userId } = req.params;

    // Find the current user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the questions
    const questions = await Question.find();

    const results = [];

    // Iterate through each question
    for (const question of questions) {
      const selectedUsers = [];

      // Iterate through the selectedBy array in each question
      for (const selected of question.selectedBy) {
        // Check if the selected option matches and the user is female
        if (selected.optionChoose === user.optionChoose && selected.userId.gender === 'female') {
          // Add the user to the selectedUsers array
          const selectedUser = await User.findById(selected.userId);
          selectedUsers.push(selectedUser);
        }
      }

      // Create a result object with the question and selected users
      const result = {
        question: question.question,
        selectedUsers,
      };

      results.push(result);
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the questions and users' });
  }
}



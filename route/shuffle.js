const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  updateQuestionById,
} = require('../controllers/quesController');

// Create a new question
router.post('/questions', createQuestion);

// Get all questions
router.get('/questions', getAllQuestions);

// Update a question by ID
router.put('/questions/:questionId', updateQuestionById);

module.exports = router;

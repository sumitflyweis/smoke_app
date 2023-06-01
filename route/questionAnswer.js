const express = require("express");
const questionController = require("../controller/questionAnswer");

// Create the router
const router = express.Router();

// Route for creating a new question
router.post("/", questionController.createQuestion);

// Route for retrieving all questions
router.get("/", questionController.getAllQuestions);

// Route for retrieving a specific question by ID
router.get("/:questionId", questionController.getQuestionById);

// Route for updating a specific question by ID
router.put("/:questionId", questionController.updateQuestion);

// Route for deleting a specific question by ID
router.delete("/:questionId", questionController.deleteQuestion);

router.put("/questions/:questionId/options/:optionIndex", questionController.optionIndex);

router.put("/questions/:questionId/options", questionController.updateOptions);

module.exports = router;

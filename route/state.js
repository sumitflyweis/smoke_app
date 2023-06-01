const express = require('express');
const router = express.Router();
const StateController = require('../controller/state');

// CREATE a new city
router.post('/', StateController.createState);

// READ all cities
router.get('/', StateController.getState);

// UPDATE a city
router.put('/:id', StateController.updateState);

// DELETE a city
router.delete('/:id', StateController.deleteState);

module.exports = router;

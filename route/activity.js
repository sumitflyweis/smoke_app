const express = require('express');
const router = express.Router();
const activityController = require('../controller/activity');

// POST /activities - Create a new activity
router.post('/', activityController.createActivity);

// GET /activities/:id - Get an activity by ID
router.get('/:id', activityController.getActivityById);

router.get('/', activityController.getActivity)

// PUT /activities/:id - Update an activity
router.put('/:id', activityController.updateActivity);

// DELETE /activities/:id - Delete an activity
router.delete('/:id', activityController.deleteActivity);

module.exports = router;

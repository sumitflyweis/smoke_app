const express = require('express');
const router = express.Router();
const friendRequestController = require('../controller/add_request');

// POST /friend-requests - Send a friend request
router.post('/', friendRequestController.sendFriendRequest);

router.get('/', friendRequestController.getAllFriendRequest);

router.get('/:id', friendRequestController.getByIdFriendRequest);


// PUT /friend-requests/:requestId/accept - Accept a friend request
router.put('/:requestId/accept', friendRequestController.acceptFriendRequest);

// PUT /friend-requests/:requestId/reject - Reject a friend request
router.put('/:requestId/reject', friendRequestController.rejectFriendRequest);

router.delete('/:id', friendRequestController.deleteFriendRequest);


module.exports = router;

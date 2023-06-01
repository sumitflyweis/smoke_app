const mongoose = require('mongoose');

const friendRequestSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

module.exports = FriendRequest;

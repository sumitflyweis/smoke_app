const FriendRequest = require('../model/add_request');

exports.sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const friendRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });

    const savedFriendRequest = await friendRequest.save();

    res.status(200).json(savedFriendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the friend request' });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    friendRequest.status = 'accepted';
    const updatedFriendRequest = await friendRequest.save();

    res.status(200).json(updatedFriendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while accepting the friend request' });
  }
};

exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    friendRequest.status = 'rejected';
    const updatedFriendRequest = await friendRequest.save();

    res.status(200).json(updatedFriendRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rejecting the friend request' });
  }
};


exports.getAllFriendRequest = async (req, res) => {
    try {
      const cities = await FriendRequest.find();
      res.json({total :cities.length , msg:cities});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



  
exports.getByIdFriendRequest = async (req, res) => {
    try {
      const cities = await FriendRequest.find({_id:req.params.id});
      res.json({msg:cities});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  

  exports.deleteFriendRequest = async (req, res) => {
    try {
      const { id } = req.params;
      await FriendRequest.findByIdAndDelete(id);
      res.json({ message: 'City deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };



 
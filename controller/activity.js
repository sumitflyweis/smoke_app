const Activity = require('../model/activity');

exports.getActivity = async (req, res) => {
  try {
    const { userId } = req.query;

    const activity = await Activity.findOne({ user : userId }).populate('user', 'firstName grade');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the activity' });
  }
};


exports.createActivity = async (req, res) => {
  try {
    const { userId, comment } = req.body;

    const activity = new Activity({
      user: userId,
      comment: comment,
    });

    const savedActivity = await activity.save();

    res.status(201).json(savedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the activity' });
  }
};

exports.getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findById(id).populate('user', 'firstName grade');

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the activity' });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { comment: comment },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the activity' });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the activity' });
  }
};

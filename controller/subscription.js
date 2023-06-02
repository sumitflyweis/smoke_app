const Question = require("../model/questionAnswer");
const contactModel = require("../model/contactlist");
const userSchema = require("../model/login");
const Subscription = require("../model/subscription");

exports.getUpdateOptions = async (req, res) => {
  try {
    const { questionId, optionIndex } = req.params;

    // Retrieve the question by its ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Find users who have selected the specified optionIndex
    const selectedUsers = await question.selectedBy
      .filter((selected) => selected.optionChoose === optionIndex)
      .map((selected) => selected.userId);

    // Populate the user objects for selected users
    const populatedUsers = await userSchema.find({
      _id: { $in: selectedUsers },
      gender: { $in: ["female", "male"] },
    });


     const subscribedUsers = [];

    const subscription = await Subscription.findOne({
      userId: question.userID,
    });
   console.log("hi")
    if (!subscription) {
      return res.status(404).json({ message: "subscription not found" });
    }
    if (subscription && subscription.subscriptionStatus) {
      subscribedUsers.push(subscription.userId);
    }
    const populatedUsers1 = await userSchema.findOne({
      _id: subscription.userId,
    });
    console.log(populatedUsers1)
    if (!populatedUsers1) {
        return res.status(404).json({ message: "user not found" });
      }

    return res.json({ question:question.question, name:populatedUsers1.firstName });




    // return res.status(200).json({ msg: populatedUsers });
    // Check subscription status and get names of users with active subscription
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the question." });
  }
};

exports.getUpdateOptions1 = async (req, res) => {
  try {
    const { questionId, optionIndex } = req.params;

    // Retrieve the question by its ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Find users who have selected the specified optionIndex
    const selectedUsers = await question.selectedBy
      .filter((selected) => selected.optionChoose === optionIndex)
      .map((selected) => selected.userId);

    // Populate the user objects for selected users
    const populatedUsers = await userSchema
      .find({
        _id: { $in: selectedUsers },
        gender: { $in: ["female", "male"] },
      })
      .populate("userId", "name");

    // Get names of users with active subscription
    const subscribedUsers = populatedUsers.map((user) => user.userId.name);

    return res.json({ question, subscribedUsers });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the question." });
  }
};

exports.updateSubscriptionStatus = async (req, res) => {
  try {
    const { userId, subscriptionStatus } = req.body;

    // Find the subscription by user ID
    const subscription = await Subscription.findOne({ userId });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Update the subscription status
    subscription.subscriptionStatus = subscriptionStatus;
    await subscription.save();

    return res.json({ message: "Subscription status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while updating the subscription status",
    });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { userId, subscriptionStatus } = req.body;

    // Create a new subscription
    const subscription = new Subscription({
      userId,
      subscriptionStatus,
    });

    // Save the subscription to the database
    await subscription.save();

    return res.json({
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the subscription" });
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    return res.json({ msg: subscriptions });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the subscriptions" });
  }
};

// Get a subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return res.json({ msg: subscription });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the subscription" });
  }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    await subscription.remove();

    return res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the subscription" });
  }
};

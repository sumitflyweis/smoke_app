const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscription");

// Create a subscription
router.post("/", subscriptionController.createSubscription);

// Get all subscriptions
router.get("/", subscriptionController.getAllSubscriptions);

// Get a subscription by ID
router.get("/:id", subscriptionController.getSubscriptionById);

router.put("/update", subscriptionController.updateSubscriptionStatus)


router.get("/getUpdateOptions/get/:questionId/:optionIndex", subscriptionController.getUpdateOptions)


// Delete a subscription
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;

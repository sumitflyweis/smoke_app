const express = require("express");
const router = express.Router();
const userController = require("../controller/locationOfCollege");

router.get("/", userController.getLocation)

// GET /users/:id - Retrieve a user by ID
router.get("/:id", userController.getLocationById)

router.post("/", userController.createLocation)

// PUT /users/:id - Update a user by ID
router.put("/:id", userController.updateLocation)

// DELETE /users/:id - Delete a user by ID
router.delete("/:id", userController.deleteLocation)

module.exports = router

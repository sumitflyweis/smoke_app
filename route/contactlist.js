const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactlist');

// CREATE a new city
router.post('/', contactController.createContact);

// READ all cities
router.get('/', contactController.getContacts);

// UPDATE a city
router.put('/:id', contactController.updateContact);

// DELETE a city
router.delete('/:id', contactController.deleteContact);

router.get('/get/all', contactController.findAnyContact);

module.exports = router;

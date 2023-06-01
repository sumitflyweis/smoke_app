const express = require('express');
const router = express.Router();
const districtController = require('../controller/district');

// CREATE a new city
router.post('/', districtController.createdistrict);

// READ all cities
router.get('/', districtController.getdistrict);

// UPDATE a city
router.put('/:id', districtController.updatedistrict);

// DELETE a city
router.delete('/:id', districtController.deletedistrict);

module.exports = router;

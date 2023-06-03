const express = require('express');
const router = express.Router();
const  privacy = require('../controller/privacy');

router.post('/', privacy.create);
router.get('/', privacy.get);
router.put('/:id',privacy.update );
router.delete('/:id', privacy.delete);




module.exports = router

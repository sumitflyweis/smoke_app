const express = require('express')
const aboutUs =  require('../controller/aboutUs');


const router = express();

router.post('/', aboutUs.createAboutUs);
router.get('/', aboutUs.getAboutUs);
router.put('/:id', aboutUs.updateAboutUs);
router.delete('/:id', aboutUs.deleteAboutUs)




module.exports = router;




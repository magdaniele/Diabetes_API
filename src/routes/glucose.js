const express = require('express');
const router = express.Router();
const {findAllGlucoseTests,
           readGlucoseTest} = require('../controllers/glucose');

router.get('/',findAllGlucoseTests);
router.post('/',readGlucoseTest);

module.exports = router;

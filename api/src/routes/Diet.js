const express = require('express');
const { dietas } = require('../controllers/Diet.controllers');
const router = express.Router();



router.get('/',dietas);





module.exports = router;
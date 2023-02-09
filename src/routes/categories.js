const express = require('express');
const router = express.Router();
const categories = require('../controllers/categories');


router.get('/categories', categories.getCategories);


module.exports = router;

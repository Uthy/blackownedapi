const express = require('express');
const router = express.Router();
const businesses = require('../controllers/businesses');

router.get('/businesses', businesses.getBusinesses);
router.get('/businesses/:id', businesses.getBusiness);
router.get('/businesses/city/:city', businesses.getBusinessesByCity);
router.get('/businesses/state/:state', businesses.getBusinessesByState);
router.get('/businesses/category/:category', businesses.getBusinessesByCategory);

module.exports = router;


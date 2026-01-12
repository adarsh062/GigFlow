const express = require('express');
const { createGig, getGigs, getGig, getMyGigs } = require('../controllers/gigController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createGig); // Protected
router.get('/', getGigs); // Public
router.get('/my', verifyToken, getMyGigs); // Protected (Dashboard)
router.get('/:id', getGig); // Public

module.exports = router;
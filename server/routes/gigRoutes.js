const express = require('express');
const { createGig, getGigs, getGig, getMyGigs } = require('../controllers/gigController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createGig); 
router.get('/', getGigs);
router.get('/my', verifyToken, getMyGigs);
router.get('/:id', getGig);

module.exports = router;
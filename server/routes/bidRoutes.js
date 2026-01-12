const express = require('express');
const { createBid, getBidsByGig, hireFreelancer } = require('../controllers/bidController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createBid);
router.get('/:gigId', verifyToken, getBidsByGig);
router.post('/hire', verifyToken, hireFreelancer);

module.exports = router;
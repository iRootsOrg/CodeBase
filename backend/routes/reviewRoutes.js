const express = require('express');
const {createReview,addCommentToReview,getReview} = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviews', createReview);
router.post('/reviews/:reviewId/comments/:commentId', addCommentToReview);
router.get('/reviews/:id', getReview);

module.exports = router;
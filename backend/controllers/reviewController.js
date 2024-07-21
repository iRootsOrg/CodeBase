const Review = require('../models/reviewModel');
const CustomError = require('../utils/CustomError');

const createReview = async (req, res, next) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).send(review);
    } catch (error) {
        next(new CustomError('Failed to create review', 400));
    }
};

const addCommentToReview = async (req, res, next) => {
    const { reviewId, commentId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw new CustomError('Review not found', 404);
        }

        const comment = review.comments.id(commentId);
        if (!comment) {
            throw new CustomError('Comment not found', 404);
        }

        const { content, author, isReviewer } = req.body;
        if (!content) {
            throw new CustomError('Content is required', 400);
        }
        if (!author) {
            throw new CustomError('Author is required', 400);
        }
        
        comment.replies.push({ content, author, isReviewer });

        await review.save();
        res.status(201).send(comment);
    } catch (error) {
        next(error);
    }
};

const getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('author')
            .populate('reviewer')
            .populate('comments.author')
            .populate('comments.replies.author');
        if (!review) {
            throw new CustomError('Review not found', 404);
        }
        res.send(review);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createReview,
    addCommentToReview,
    getReview
};

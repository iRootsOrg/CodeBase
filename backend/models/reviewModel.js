const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isReviewer: {
        type: Boolean,
        required: true
    },
    replies: [{
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        isReviewer: Boolean,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true});

const reviewSchema = new mongoose.Schema({
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [commentSchema],
    status: {
        type: String,
        enum: ['PENDING', 'UNDER_REVIEW', 'REQUIRES_CHANGES', 'APPROVED'],
        default: 'PENDING'
    },
    resubmissions: [{
        submission:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
            required: true
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    }],
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
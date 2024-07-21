const mongoose = require('mongoose');

const editingSessionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    sessionId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const EditingSession = mongoose.model("EditingSession", editingSessionSchema);
module.exports = EditingSession;
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: String,
        enum: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'RUN_TESTCASES', 'CONTRIBUTE']
    }]
});

module.exports = mongoose.model('Role', roleSchema);
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: String,
    name: String,
    permissions: [String]
});

module.exports = mongoose.model('Role', roleSchema);
const mongoose = require('mongoose');

const Message = mongoose.Schema({
    user: { type: String, required: [true, 'username required']},
    text: { type: String, required: [true, 'text of message required']},
    created_at: { type: Date, default: Date.now }
});

module.exports.Message = mongoose.model('MessageSc', Message);
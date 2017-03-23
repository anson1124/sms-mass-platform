var mongoose = require('mongoose');
var messageSchema = require('../schemas/message');
var message = mongoose.model('Message', messageSchema);

module.exports = message
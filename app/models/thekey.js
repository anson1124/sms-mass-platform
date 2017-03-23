var mongoose = require('mongoose');
var thekeySchema = require('../schemas/thekey');
var thekey = mongoose.model('Thekey', thekeySchema);

module.exports = thekey
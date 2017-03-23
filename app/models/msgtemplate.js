var mongoose = require('mongoose');
var msgtemplateSchema = require('../schemas/msgtemplate');
var msgtemplate = mongoose.model('Msgtemplate', msgtemplateSchema);

module.exports = msgtemplate
var mongoose = require('mongoose');
var smstemplateSchema = require('../schemas/smstemplate');
var smstemplate = mongoose.model('Smstemplate', smstemplateSchema);

module.exports = smstemplate
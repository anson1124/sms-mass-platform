var Message = require('../models/message');


exports.massList = function(req, res){
  var userid = req.session.user._id;
  Message.find({user: userid}, function(err, messages){
    if (err) {
      console.log(err);
    }
    res.render('massList', {
      baseurl: req.url,
      messages: messages,
    });
  })
}
var User = require('../models/user');
var Message = require('../models/message');
var Member = require('../models/member');

exports.index = function(req, res){
  User.findById(req.session.user._id, function(err, user){
    logincount = user.loginCount;
    Message.count({ user: user._id }, function(err, Messagecount){
      Member.count({ user: user._id }, function(err, Membercount){
        res.render('index', {
          gritter: true,//打开js提示
          baseurl: req.url,
          Mass_info: Messagecount,
          Data_add: Membercount,
          Recent_login: logincount,
          Msg_Noread: 3,
        });
      })
    });
  })
}

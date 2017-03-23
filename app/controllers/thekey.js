var Thekey = require('../models/thekey');
var uuid = require('node-uuid');

exports.setCancel = function(req, res){
  var id = req.body.kid;
  Thekey.update({_id:id}, {$inc:{issue:2}}, function(err){
    if (err) {console.log(err);}
    return res.json({success:1});
  })
}

exports.setAccept = function(req, res){
  var id = req.body.kid;
  Thekey.update({_id:id}, {$inc:{issue:1}}, function(err){
    if (err) {console.log(err);}
    return res.json({success:1});
  })
}

exports.keyList = function(req, res){
  Thekey
  .find({})
  .populate('user', 'name')
  .exec(function(err, thekeys){
    console.log(thekeys);
    res.render('keyList', {
      isSub: true,
      keylistjs: true,
      baseurl: req.url,
      thekeys: thekeys,
    });
  })
}

exports.applyKey = function(req, res){
  Thekey.findOne({user: req.session.user._id}, function(err, thekey){
    if (err) {console.log(err);}
    console.log(thekey);
    if (thekey==null) {
      var thekey = {
        newkey: '这里不要求您填入',
      };
    }
    res.render('applyKey', {
      isSub: true,
      applykeyjs: true,
      baseurl: req.url,
      thekey: thekey,
    });
    
  })
}

exports.genUuid = function(req, res){
  Thekey.remove({user: req.session.user._id}, function(err){
    console.log('---clean db ---------------------------------------');
    if (err) {
      console.log('Thekey remove all occur a error:', err);
    } else {
      console.log('Thekey remove all success.');
    }
  })
  var newkey = uuid.v1();
  var uid = req.body.uid;
  var _thekey = {
    newkey: newkey,
    user: uid,
    issue: 0,
  };
  var thekey = new Thekey(_thekey);
  thekey.save(function(err, thekey){
    if (err) {console.log(err);}
    return res.json({success:1});
  })
}
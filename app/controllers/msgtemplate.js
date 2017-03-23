var Smstemplate = require('../models/smstemplate');
var Msgtemplate = require('../models/msgtemplate');
var User = require('../models/user');
var _ = require('lodash');

exports.configMassUpdate = function(req, res){
  var id = req.params.id;
  Msgtemplate.findById(id, function(err, msgtemp){
    if (err) {
      console.log(err);
    }
    res.render('configMass', {
      configMassjs: true,//打开js提示
      baseurl: req.url,
      msgtemp: msgtemp,
      msgtemplates: {},
    });
  });
}

exports.configMass = function(req, res){
  var userid = req.session.user._id;
  Msgtemplate.find({user: userid}, function(err, msgtemplates){
    if (err) {
      console.log(err);
    }
    res.render('configMass', {
      configMassjs: true,//打开js提示
      baseurl: req.url,
      msgtemplates: msgtemplates,
      msgtemp:{},
    });
  });
}

exports.setDefault = function(req, res){
  var msgid = req.body.msgid;
  Msgtemplate.findById(msgid, function(err, msgtemplate){
    req.session.msgtemplate = msgtemplate;
    console.log(msgtemplate);
    return res.json({success:1});
  })
}

exports.del = function(req, res){
  var id = req.query.id;
  if (id) {
    Msgtemplate.remove({_id:id}, function(err, msgtemplate){
      if (err) {console.log(err);}
      else{return res.json({success:1});}
    })
  }
}

//post 可修改
exports.save = function(req, res){
  var id = req.body.msgtemp._id;
  var msgtempObj = req.body.msgtemp;
  var _msgtemp;

  if (id) {
    Msgtemplate.findById(id, function(err, msgtemp){
      if (err) {
        console.log(err);
      }
      _msgtemp = _.extend(msgtemp, msgtempObj);
      _msgtemp.save(function(err, msgtemp){
        if (err) {
          console.log(err);
        }
        req.session.message = '修改成功';
        req.session.msgtemplate = msgtemp;
        return res.redirect('/configMass');
      })
    })
  }
  else{
    console.log(msgtempObj);
    var msgtemp = new Msgtemplate(msgtempObj);
    //console.log(msgtemp);
    Smstemplate.findOne({sms_template_code: msgtempObj.smstemplate}, function(err, smstemplate){
      //console.log(smstemplate);
      msgtemp.smstemplate = smstemplate._id;
      msgtemp.save(function(err, msgtemp){
        if (err) {
          console.log(err);
        }
        req.session.message = '你已经成功添加一条模板';
        req.session.msgtemplate = msgtemp;
        return res.redirect('/configMass');
      })
    })
  }
}
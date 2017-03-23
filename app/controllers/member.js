var fs = require('fs');
var trim = require('trim');
var path = require('path');
var _ = require('lodash');
var csv = require('node-csv').createParser();
var ra = require('../../randData');
var Client = require('../../alidayu/topClient').TopClient;
var Member = require('../models/member');
var Smstemplate = require('../models/smstemplate');
var Msgtemplate = require('../models/msgtemplate');
var Message = require('../models/message');
//exports importCSV
exports.importCSV = function(req, res){
  Member.remove({user: req.session.user._id}, function(err){
    console.log('---clean db ---------------------------------------');
    if (err) {
      console.log('Member remove all occur a error:', err);
    } else {
      console.log('Member remove all success.');
    }
  })
  var csvFileData = req.files.uploadCSV;
  var filePath = csvFileData.path;
  var originalFilename = csvFileData.originalFilename;
  var _member = {
    name: null,
    tel: null,
    user: null,
  };
  if (originalFilename) {
    fs.readFile(filePath, function(err, data){
      var timestamp = Date.now();
      var type = csvFileData.type.split('/')[1];
      var csvFile = timestamp + '.' + type;
      var newPath = path.join(__dirname, '../../', '/public/upload/' + csvFile);
      fs.writeFile(newPath, data, function(err){
        csv.parseFile(newPath, function(err, data) {
          if(err){ console.log(err); }
          _.forEach(data, function(val){
            console.log(val);
            _member.name = val[0];
            _member.tel = val[1];
            _member.user = req.session.user._id;
            member = new Member(_member);
            member.save(function(err, member){
              if (err) {
                console.log(err);
              }
            })
          });
          return res.redirect('/CSVimport');
        });
      });
    })
  }
}

exports.CSVimport = function(req, res){
  var userid = req.session.user._id;
  Member.find({user: userid}, function(err, members){
    if (err) {
      console.log(err);
    }
    res.render('CSVimport', {
      baseurl: req.url,
      members: members,
    });
  })
}

exports.beganMass = function(req, res){
  var uid = req.body.uid;
  var smsid = req.body.smsid;
  var msgid = req.body.msgid;
  console.log(uid);
  console.log(smsid);
  console.log(msgid);
  var send_opts = {
    extend: ra.randomstr,
    sms_type: 'normal',
    sms_free_sign_name: '柠檬工作室',
    sms_param: '{\"name\":\"张超\",\"meeting\":\"技术部会议\",\"starttime\":\"3月20日\",\"place\":\"活动中心211\"}',
    rec_num: '18858395625',
    sms_template_code: 'SMS_56640089'
  }
  Smstemplate.findOne({sms_template_code: smsid}, function(err, smstemplate){
    send_opts.sms_type = smstemplate.sms_type;
    send_opts.sms_free_sign_name = smstemplate.sms_free_sign_name;
    send_opts.sms_template_code = smstemplate.sms_template_code;
    Msgtemplate.findById(msgid, function(err, msgtemplate){
      Member.find({user: uid}, function(err, members){
        _.forEach(members, function(member){
          send_opts.sms_param = '{\"name\":\"'+ member.name +'\",\"meeting\":\"'+ msgtemplate.meeting +'\",\"starttime\":\"'+ msgtemplate.starttime +'\",\"place\":\"'+ msgtemplate.place +'\"}';
          send_opts.rec_num = trim(member.tel);
          var client = new Client({
            'appkey':'23291561',
            'appsecret':'600375781eb433e4dfad2eebe3a8a1dc',
            'REST_URL': 'http://gw.api.taobao.com/router/rest'
          });
          console.log(send_opts);
          client.execute('alibaba.aliqin.fc.sms.num.send', send_opts, function(error, response) {
              if (!error){
                console.log(response);
                var _message = {
                  groupid: send_opts.extend,
                  detail: JSON.stringify(send_opts),
                  result: JSON.stringify(response.result),
                  request_id: response.request_id,
                  user: uid,
                };
                var message = new Message(_message);
                message.save(function(err, message){
                  if (err) {console.log(err);}
                })
              }
              else {
                console.log(error);
              }
          })
        })
        var id = req.session.thekey._id;
        Thekey.update({_id:id}, {$inc:{issue:1}}, function(err){
          if (err) {console.log(err);}
          return res.json({success:1});
        })
      })
    })
  })

}

exports.beganMassing = function(req, res){
  var userid = req.session.user._id;
  if (req.session.msgtemplate==null) {
    req.session.message = '请先配置群发消息';
    return res.redirect('/configMass');
  }
  if (req.session.thekey==null) {
    req.session.message = '请先申请资格';
    return res.redirect('/applyKey');
  }
  Member.find({user: userid}, function(err, members){
    if (err) {
      console.log(err);
    }
    res.render('beganMassing', {
      massjs: true,
      baseurl: req.url,
      members: members,
    });
  })
}
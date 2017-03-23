var User = require('../models/user');
var _ = require('lodash');

exports.homePage = function(req, res){
  res.render('homePage', {
    isSub: true,
    baseurl: req.url,
  });
}

exports.showSignin = function(req, res){
  res.render('signin', {
    title: '管理员登录'
  });
}

exports.loginSuccess = function(req, res){
  if (!req.session.user) {
    return res.redirect('/index');
  }else{
      res.render('loginSuccess', {
      title: '管理员登录',
    });
  }
}

exports.motifyPwd = function(req, res){
  var userObj = req.session.user;
  var userid = userObj._id;
  var opassword = req.body.opassword;
  userObj.password = req.body.npassword;
  var _user;

  User.findById(userid, function(err, user){
    user.comparePassword(opassword, function(err, isMatch){
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        _user = _.extend(user, userObj);
        user.save(function(err, user){
          if (err) {
            console.log(err);
          }
          req.session.message = '修改成功';
          return res.redirect('/homePage');
        })
      }else{
        req.session.message = '修改失败,请检查原密码是否正确';
        return res.redirect('/homePage');
      }
    })
  })
}

exports.signin = function(req, res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;
  User.findOne({name: name}, function(err, user){
    if (err) {
      console.log(err);
    }
    if (!user) {
      return res.redirect('/index');
    }
    user.comparePassword(password, function(err, isMatch){
      if (err) {
        console.log(err);
      }
      if (isMatch) {
        req.session.user = user;
        User.update({_id: user._id}, {$inc: {loginCount: 1}}, function(err){
          if (err) {console.log(err);}
          return res.redirect('/loginSuccess');
        })
      }else{
        return res.redirect('/index');
      }
    })
  })
}

exports.showSignup = function(req, res){
  res.render('signup', {
    title:'注册页面'
  })
}

exports.signupSuccess = function(req, res){
  if (!req.session.user) {
    return res.redirect('/index');
  }else{
      res.render('signupSuccess', {
      title: '注册页面',
    });
  }
}

exports.signup = function(req, res){
  var _user = req.body.user;
  User.findOne({name:_user.name}, function(err, user){
    //return res.redirect('/signupSuccess');
    console.log(user);
    if(err){
      console.log(err);
    }
    if(user){
      console.log(user);
      return res.redirect('/login');
    }else{
      user = new User(_user);
      console.log(user);
      user.save(function(err, user){
        if(err){
          console.log(err);
        }
        req.session.user = user;
        return res.redirect('/signupSuccess');
      })
    }
  })
}

// logout
exports.logout = function(req, res){
  delete req.session.user;
  //delete app.locals.user;
  res.redirect('/index');
}
// middleware for user
exports.signinRequired = function(req, res, next){
  var user = req.session.user;
  if(!user){
    return res.redirect('/signin');
  }
  next();
}
// middleware for user
exports.adminRequired = function(req, res, next){
  var user = req.session.user;
  console.log(user);
  if(user.role <= 10){
    return res.redirect('/signin');
  }
  next();
}
var Index = require('./app/controllers/index');
var User = require('./app/controllers/user');
var Msgtemplate = require('./app/controllers/msgtemplate');
var Member = require('./app/controllers/member');
var Message = require('./app/controllers/message');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


module.exports = function(app){
  //pre handle user
  app.use(function(req, res, next){
    app.locals.user = req.session.user;
    app.locals.msgtemplate = req.session.msgtemplate;
    app.locals.message = req.session.message;
    if (req.method === 'GET') {
      req.session.message = '';
    }
    next();
  })

  // index page
  app.get('/', User.signinRequired, Index.index);
  app.get('/index', User.signinRequired, Index.index);

  //config Mass
  app.get('/configMass', User.signinRequired, Msgtemplate.configMass);

  //homePage
  app.get('/homePage', User.signinRequired, User.homePage);
  //applyKey
  app.get('/applyKey', User.signinRequired, User.applyKey);

  //CSVimport
  app.get('/CSVimport', User.signinRequired, Member.CSVimport);

  //beganMassing
  app.get('/beganMassing', User.signinRequired, Member.beganMassing);

  //login
  app.get('/signin', User.showSignin);

  //sign in
  app.post('/user/signin', User.signin);
  //sign in
  app.get('/loginSuccess', User.loginSuccess);
  //signUp
  app.get('/signup', User.showSignup);

  //signUp
  app.post('/user/signup', User.signup);
  //signUp
  app.get('/signupSuccess', User.signupSuccess);
  //logout
  app.get('/logout', User.logout);
  //motify pwd
  app.post('/user/motifyPwd', User.signinRequired, User.motifyPwd);

  //set Default
  app.post('/setDefault', User.signinRequired, Msgtemplate.setDefault);

  //msgtemp post
  app.post('/postmsg', User.signinRequired, Msgtemplate.save);

  //csv
  app.post('/csvUpload', multipartMiddleware, User.signinRequired, Member.importCSV);

  //post beganMass
  app.post('/beganMass', User.signinRequired, Member.beganMass);
  //get masslist
  app.get('/massList', User.signinRequired, Message.massList);

  //get Update
  app.get('/configMassUpdate/:id', User.signinRequired, Msgtemplate.configMassUpdate);
  //delete 
  app.delete('/configMass/del', User.signinRequired, Msgtemplate.del);
  // //signup
  // app.post('/user/signup', User.signup)
  // // important
  // // router : /user/signup/:userid
  // // var _userid = req.params.userid
  // // router : /user/signup/111?userid=111
  // // var _userid = req.query.userid
  // // router : /user/signup => {userid:111} =>{such as ajax}
  // // var _userid = req.body.userid 

  // //signin
  // app.post('/user/signin', User.signin)
  // app.post('/user/signup', User.signup)
  // // logout
  // app.get('/signin', User.showSignin)
  // app.get('/signup', User.showSignup)
  // app.get('/logout', User.logout)
  // //user list
  // app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

  // // detail page
  // app.get('/movie/:id', Movie.detail)
  // // list page
  // app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
  // // admin page
  // app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
  // // admin update movie
  // app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
  // // admin list delete
  // app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)
  // // admin post movie save
  // app.post('/admin/movie', multipartMiddleware, User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save)  

  // //category
  // app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
  // app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
  // app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

  // //comment
  // app.post('/comment', User.signinRequired, Comment.save);
  // //results
  // app.get('/results', Index.search)
}
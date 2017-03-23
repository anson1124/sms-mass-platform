var _ = require('lodash');
var filepath = "./tel.csv";
var csv = require('node-csv').createParser();
csv.parseFile(filepath, function(err, data) {
    if(err){ console.log(err); }
    //输出data
    //console.log(data);
    _.forEach(data, function(val){
      console.log(val);
    })
    // var youngest = _
    //   .chain(data).map(function(user){
    //     return [user.user, user.age];
    //   }).zipObject()
    //   .value();
    // console.log(youngest);
});

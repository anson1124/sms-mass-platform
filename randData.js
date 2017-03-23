'use strict'

var range = function(start,end){
  var array=[];
  for(var i=start;i<end;++i) array.push(i);
  return array;
};
var randomstr = range(0, 5).map(function(x){
    return Math.floor(Math.random()*10);
  }).join('');

exports.randomstr = randomstr;

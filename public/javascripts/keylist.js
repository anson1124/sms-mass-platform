$(function(){
  $('.accept').click(function(e){
    var target = $(e.target);
    var kid = target.data('kid');
    var url = '/setAccept';
    var data = {
      kid: kid,
    }
    var success = function(res){
      if (res.success === 1) {
        alert('设置成功');
        window.location.href="/keyList ";
      }
    }
    $.post( url, data, success, 'json');
  })//
  $('.cancel').click(function(e){
    var target = $(e.target);
    var kid = target.data('kid');
    var url = '/setCancel';
    var data = {
      kid: kid,
    }
    var success = function(res){
      if (res.success === 1) {
        alert('设置成功');
        window.location.href="/keyList ";
      }
    }
    $.post( url, data, success, 'json');
  })//cancel
})
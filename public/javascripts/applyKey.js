$(function(){
  $('.apply').click(function(e){
    var target = $(e.target);
    var uid = target.data('uid');
    var url = '/genUuid';
    var data = {
      uid: uid,
    }
    var success = function(res){
      if (res.success === 1) {
        alert('申请成功,请等待Root同意');
        window.location.href="/applyKey ";
      }
    }
    $.post( url, data, success, 'json');
  })
})
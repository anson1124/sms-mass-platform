$(function(){
  $('#began').click(function(e){
    var target = $(e.target);
    var uid = target.data('uid');
    var smsid = target.data('smsid');
    var msgid = target.data('msgid');
    var url = '/beganMass';
    var data = {
      uid: uid,
      smsid: smsid,
      msgid: msgid,
    }
    var success = function(res){
      if (res.success === 1) {
        alert('添加成功');
      }
    }
    $.post( url, data, success, 'json');
  })
})
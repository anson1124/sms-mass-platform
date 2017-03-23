$('input[type="text"].form-control').blur(function(){
  var Meeting = $('#m').val();
  var Starttime = $('#s').val();
  var Place = $('#p').val();
  $('span#Meeting').html(Meeting);
  $('span#Starttime').html(Starttime);
  $('span#Place').html(Place);
})
$(function(){
  $('.default').click(function(e){
    var target = $(e.target);
    var msgid = target.data('msgid');
    var url = '/setDefault';
    var data = {
      msgid: msgid,
    }
    var success = function(res){
      if (res.success === 1) {
        alert('设置默认成功');
        window.location.href="/configMass ";
      }
    }
    $.post( url, data, success, 'json');
  })
  $('.del').click(function(e){
    var target = $(e.target);
    var id = target.data('msgid');
    var tr = $('.item-msgid-'+id);
    $.ajax({
      type:'DELETE',
      url:'/configMass/del?id='+id
    })
    .done(function(res){
      if(res.success === 1){
        if (tr.length > 0){
          tr.remove()
        }
      }
    })
  })
})
$(document).ready(function () {
    var unique_id = $.gritter.add({
    // (string | mandatory) the heading of the notification
    title: '欢迎来到电信群发通知平台!',
    // (string | mandatory) the text inside the notification
    text: '这里计价为0.05元/条短信,更多我的网站请来<a href="https://limonplayer.cn" target="_blank" style="color:#ffd777">limonplayer.cn</a>.',
    // (string | optional) the image to display on the left
    image: '/assets/img/ui-zac.jpg',
    // (bool | optional) if you want it to fade out on its own or just sit there
    sticky: true,
    // (int | optional) the time you want it to be alive for before fading out
    time: 3000,
    // (string | optional) the class name you want to apply to that specific message
    class_name: 'my-sticky-class'
    });
    return false;
  });
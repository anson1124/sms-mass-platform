TopClient = require('./topClient').TopClient;

var client = new TopClient({
  'appkey':'23291561',
  'appsecret':'600375781eb433e4dfad2eebe3a8a1dc',
  'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

client.execute('alibaba.aliqin.fc.sms.num.send', {
    'extend':'123456',
    'sms_type':'normal',
    'sms_free_sign_name':'柠檬工作室',
    'sms_param':'{\"name\":\"张超\",\"meeting\":\"技术部会议\",\"starttime\":\"3月20日\",\"place\":\"活动中心211\"}',
    'rec_num':'18858395625',
    'sms_template_code':'SMS_56640089'
}, function(error, response) {
    if (!error) console.log(response);
    else console.log(error);
})
/*
${name},您好,${meeting}将于${starttime}在${place}召开,请准时参加
*/
var config = {
  web: {
    title: "短信群发通知平台",
    memu: [
      {
        fa: "dashboard", 
        name: "最近发送", 
        url: '/index',
      }, 
      {
        fa: "desktop", 
        name: "配置群发", 
        url: '/configMass',
      }, 
      {
        fa: "cogs", 
        name: "个人主页", 
        url: 'javascript:;', 
        sub:[{
          name: '修改密码',
          url: '/homePage',
        },{
          name: '申请key',
          url: '/applyKey',
        }
        ],
      }, //homePage
      {
        fa: "book", 
        name: "CSV名单导入", 
        url: '/CSVimport'
      }, 
      {
        fa: "tasks", 
        name: "开始群发", 
        url: '/beganMassing'
      },
      {
        fa: "list", 
        name: "群发记录", 
        url: '/massList'
      },
    ],
    theme_color: "yellow"
  },
};

module.exports = config;
# smsMassPlatform

这是一个基于nodejs依靠express框架搭建的短信群发平台

## 简介

本项目是[大学生社团分布式管理系统](#)的子项目,用于其对人员考核或者进度的提醒和通知,由于是分布式系统的原因,所以其人员信息可以通过CSV文件导入,或者从系统的数据库中导入,方便进行系统的管理.

1. 项目后端的搭建 :

- 使用`NodeJs`的`express`框架完成网站后端搭建; 
- 使用`mongodb`完成数据存储,通过mongoose模块完成对mongodb数据的构建;使用pug模板引擎完成页面创建渲染;
- 使用`Moment.js`格式化电影存储时间;
- 利用`alibaba.aliqin.fc.sms.num.send` (短信发送)收费API作为发短信支持

2. 项目前端搭建:

- 使用`jQuery`和`Bootsrap`完成网站前端JS脚本和样式处理;
- 使用`jQuery.min.js`完成对账号以及选项的判断;
- 前后端的数据请求交互通过`Ajax`完成;
- 前端的页面渲染通过`PUG`最新插件完成;

3.本地环境的搭建 : 

- 开发环境在windows10下完成
- 运行在ubuntu 16 下,并通过nginx通过代理端口完成域名与服务器的连接

## Design 设计

项目主页如下如所示(点击可以查看)

[![项目主页](https://raw.github.com/Lanseria/smsMassPlatform/master/docs/images/index.png)](http://msgweb.limonplayer.cn/)

[![项目部分截图](https://raw.github.com/Lanseria/smsMassPlatform/master/docs/images/index.png)](http://msgweb.limonplayer.cn/)



### 详细功能

本项目主要由`CSV`名单导入和短信群`smsMass`发两大功能;

- 其中具有重要特色的功能是对权限的控制上附加了对申请`key`的操作;
- 其次在短信模板上可以自己相应的信息,进行合理的增删改查与默认的功能;
- 对短信群发的信息有日志的记录`log`;
- 对用户的权限处理;
### 项目结构:
```
├── app.js              项目入口文件
├── alidayu             alidayu SDK
├── app                 Node后端MVC文件目录
│   ├── controllers     控制器目录
│   │   ├── member      member页面控制器目录
│   │   ├── message     message页面控制器目录
│   │   ├── user        用户页面控制器目录
│   │   ├── msgtemplate msgtemplate页面控制器目录
│   │   ├── index       index主页面控制器目录
│   │   └── thekey      thekey控制器目录
│   ├── models          模型目录
│   │   ├── member
│   │   ├── message
│   │   ├── user
│   │   ├── msgtemplate
│   │   ├── smstemplate
│   │   └── thekey
│   ├── schemas       模式目录
│   │   ├── member
│   │   ├── message
│   │   ├── user
│   │   ├── smstemplate
│   │   ├── thekey
│   │   └── msgtemplate
│   └── views         视图文件目录
│       ├── includes
│       ├── pages
│       └── layout.pug

├── db                供参考的数据库数据
│   └── learnsite
├── node_modules      node模块目录
├── public            静态文件目录
│   ├── css           样式目录
│   ├── fonts         字体目录
│   ├── images        静态图片目录
│   ├── js            JS脚本目录
│   ├── upload        用户自定义上传图片存储目录
│   │   ├── avatar    用户头像图片目录
│   │   └── mainimg   文章主图片目录
│   └favicon.png      favicon
├── README.md
├── gruntfile.js      grunt文件
└── package.json 
```

## 运行环境及Node版本:

- 目前在windows10下以及ubuntu 16下都能很好运行,当然[nodejs](https://nodejs.org/en/)不能是最新7的版本

- 安装[mongodb](https://www.mongodb.org/downloads#production)完成相关配置;

- 在当前项目目录中使用npm install命令安装相关模块(如果模块下载速度慢可考虑使用淘宝cnpm镜像进行下载);

## Installation 安装

- 首先对node与mongo进行安装
- 通过`mongorestore -d dbs -dir path  `进行数据库的导入
- 接着安装插件`npm install`
- `forever start app.js `对应用进行后台处理
- 如果需要nginx进行代理则设置相应的代理



## Thanks for 感谢
<p align="center">
  <img alt="Node.js" src="https://nodejs.org/static/images/logo-light.svg" width="400"/>
</p>
本项目基于[Nodejs](https://nodejs.org/en/)

[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

以[Express](http://expressjs.com/)作为web框架

用了[mongo](http://mongodb.com)为数据库,并用[mongoose](http://mongoosejs.com/)作为连接插件

## 所有的npm插件如下

    "bcrypt": "^1.0.2",
    "bluebird": "^3.5.0",
    "body-parser": "^1.17.1",
    "connect-mongo": "^1.3.2",
    "connect-multiparty": "^2.0.0",
    "cookie-parser": "^1.4.3",
    "express": "^4.15.2",
    "express-session": "^1.15.1",
    "grunt": "^1.0.1",
    "grunt-concurrent": "^2.3.1",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-nodemon": "^0.4.2",
    "lodash": "^4.17.4",
    "moment": "^2.18.0",
    "mongoose": "^4.9.1",
    "morgan": "^1.8.1",
    "node-csv": "^0.1.2",
    "node-uuid": "^1.4.8",
    "pug": "^2.0.0-beta11",
    "serve-favicon": "^2.4.1",
    "trim": "0.0.1",
    "urllib": "^2.21.2"
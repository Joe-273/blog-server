mysite-server是为渡一「个人空间」项目提供的后端接口服务

# 如何使用？

## mongodb安装

服务在运行过程中需要用到mongodb数据库，因此，你需要按照下面的教程安装mongodb

[windows安装mongodb](https://www.runoob.com/mongodb/mongodb-window-install.html)

[mac安装mongodb](https://www.runoob.com/mongodb/mongodb-osx-install.html)

[linux安装mongodb](https://www.runoob.com/mongodb/mongodb-linux-install.html)

安装完成后，打开终端，输入命令`mongo --version`，看是否能打印出mongo版本号，只要能够打印出版本号即可

```shell
$ mongo --version
MongoDB shell version v4.2.6
git version: 20364840b8f1af16917e4c23c1b5f5efd8b352f8
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

## 克隆仓库

```shell
git clone https://gitee.com/duyiedu/mysite-server
```

## 安装依赖

```shell
$ cd mysite-server
$ npm i
```

## 修改配置

如果要修改某些配置，可以进入`/config/config.default.js`进行修改，该文件中注释了大量可供修改的配置

其中大部分配置都不需要进行修改，但强烈建议修改下面两个配置

```js
// 用于加密的秘钥
exports.keys = 'mysite-server_1619336153310_6069'; // 为避免安全问题，强烈建议修改该值
```

```js
// 初始化的管理员信息
exports.admin = {
  loginId: 'admin', // 为避免安全问题，强烈建议修改该值
  loginPwd: '123123', // 为避免安全问题，强烈建议修改该值
  name: '超级管理员',
};
```

## 启动服务

之前的步骤只需要做一次即可

完成之后，即可启动服务

进入`mysite-server`根目录，进入终端，运行下面的命令即可启动服务

```shell
npm start
```

启动完成后即可关闭终端

根据配置文件，服务将监听本机的`7001`端口，此时，你可以根据[个人空间的接口文档](http://mock.duyiedu.com/project/76/interface/api)进行前端程序的开发了。

重启电脑后，重新启动服务即可

## 停止服务

大部分情况下，你都无须停止服务

但如果你在服务运行过程中更改了服务端代码，例如配置内容，则需要停止服务后重新启动

如果需要停止服务，进入`mysite-server`目录，运行`npm stop`即可
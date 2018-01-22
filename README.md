# node-cheerio
> Use `node.js` and `cheerio` to `crawler`

这是一个很简单的爬虫练习<br>
三种处理获取数据的方式：<br>
 * hero.js 将数据图片下载到hero文件<br>
 * heroJSON.js 将数据保存为heroList.json文件<br>
 * demo 直接将获得的数据写成api，前端用ajax获取并展示在页面上<br>

# 项目运行（node.js）

## 克隆到本地
git clone https://github.com/Bigzo/node-cheerio

## 进入文件夹
cd node-cheerio

## 安装依赖
npm install
npm request
npm cheerio

## 运行hero
node hero.js

> 生成hero文件

## 运行heroJSON
node heroJSON.js

> 生成heroList.json文件

## 进入demo文件夹
cd demo

## 安装依赖
npm install

## 开启本地服务器localhost:3000
nodemon app.js
```
![hero](node-cheerio/img/res.png)

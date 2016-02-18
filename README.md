本项目为钱小蜜2.0，智能聊天系统

通过启动app.js，运行程序

本程序功能为：

  通过用户提交的问题，进行智能分析，匹配关键词，进行推荐相关答案

实现原理如下：

  1.通过socket.io模块进行长通讯连接，收发消息
  2.通过载入Segment模块进行分词，提取关键字（ps:去除消息的标点符号 ）
  3.运用mysql进行数据存储，使用框架orm2进行CRUD
  4.把分词的arr与关键字做对比，筛出需要查找的关键字，拼接where条件
  5.根据筛选后的arr进行查找，并update搜索热度字段（hit）（加1）
  6.返回select后的结果集，order by hit字段

 
mysql 表结构如下：
  id(pk)  keyword(关键字)  question(问题)  answer(答案)   hitnum(搜索热度，int)

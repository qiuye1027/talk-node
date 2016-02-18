// 载入模块 
var Segment = require('./fcindex').Segment;
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
 
//查找数据库，进行比对
var cddb = require('./cddb');
 
exports.search = function(msg,callback){
	//去除标点符号 
  	msg=msg.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\（|\）|\【|\】|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\，|\。|\？|\“|\”|\：|\；|\‘|\’|\！|\<|\.|\>|\/|\?]/g,""); 
  	 
	//分词关键字
	var arr = segment.doSegment(msg);
	cddb.findData(arr,msg,function(data){
		callback(data);
	}); 
}
 
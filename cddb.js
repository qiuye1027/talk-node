var mysql = require('mysql');  
var orm = require("orm");

//创建连接 
var database = 'myfc',table = 'fcrule', user='root' ,password='123456' ;
var host = "localhost:3306";
 
exports.findData = function(keyword,msg,callback){
  
  //拼接分词 where条件
  var str ="";
   for(var j in keyword ){

    if(j == keyword.length-1){
      str +="keyword='"+keyword[j].w;
    }else{
      str +="keyword='"+keyword[j].w+"' OR ";
    } 
   }
 // console.log('SELECT answer FROM '+table +" where ("+str+"')")


  orm.connect("mysql://"+user+":"+password+"@"+host+"/"+database, function (err, db) {
     db.driver.execQuery('SELECT answer FROM '+table +" where ("+str+"') order by hitnum desc", function (err, data) {  
       if (err) { throw err; }  
        
        if(data.length>0){ 
          for(var j in data){
            if(data[j].answer != null){
              
               callback(data[j].answer);
            } 
          } 
        }else{
          for(var j in keyword ){
             insertData([keyword[j].w],msg,db);
           }
           callback("对不起，您搜索的内容无");
        }  


        for(var j in keyword ){ 
          updataData([keyword[j].w],db);
        }

      });  
  });    
}

var insertData = function(data,msg,db){ 
  db.driver.execQuery("INSERT INTO  `fcrule` (`keyword`, `question`,`hitnum`) VALUES (?, ?,?)",[data,msg,0], function (err, data) {  
    console.log('插入一条关键字，请填写对应词条')
  });  
}


var updataData = function(data,db){ 
  db.driver.execQuery("UPDATE `myfc`.`fcrule` SET `hitnum` = `hitnum`+1 WHERE keyword=?",[data], function (err, data) {  
    
  });
}

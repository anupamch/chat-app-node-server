'user strict'
import express from 'express';
var app=require('../../app.js')

app=express()
var Sequelize=require('sequelize')
var fs = require('fs')

var env=app.get('env')
console.log(env)
var dbConfigFile=__dirname+"/dbConfig.json"

var data=fs.readFileSync(dbConfigFile,'utf8')

var dbConfig=JSON.parse(data)['development']


var port=dbConfig.port?dbConfig.port:3306
console.log(dbConfig.storage)
var connection=new Sequelize(dbConfig.storage,'','',{
                                                                         
                                                                                host:'localhost' ,
                                                                                dialect:dbConfig.dialect,
                                                                                pool: {
                                                                                  max: 5,
                                                                                  min: 0,
                                                                                  idle: 10000
                                                                                },
                                                                                storage: dbConfig.storage

                                                                         


}

)

connection.authenticate().then(function(err){
             console.log('Connection has been established successfully.');
           },function(err){
             console.log('Unable to connect to the database:'+err);


})

module.exports=connection

"use strict";
var db=require('../connection.js')
var DataTypes = require("sequelize");


// load models
var models = [
     'User',
     'UserAuth',
     'Message'
     
   
];


models.forEach(function(model) {
    module.exports[model]=  db.import("./"+model);
});

(function(m) {
  
  m.UserAuth.belongsTo(m.User,{foreignKey:'user_id'})
  m.Message.belongsTo(m.User,{foreignKey:'from'})
  m.Message.belongsTo(m.User,{foreignKey:'to'})
    
})(module.exports);

module.exports.db = db;
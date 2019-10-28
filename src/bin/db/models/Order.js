"use strict";
module.exports=function(sequelize, DataTypes){
    return sequelize.define('Order',{
        id: { type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        payment_mode:{type:DataTypes.STRING,defaultValue:'cod'},
        payment_status:{type:DataTypes.BOOLEAN,defaultValue:false},
        item_number:DataTypes.INTEGER,
        discount_cost:{type:DataTypes.INTEGER,defaultValue:0},
        total_cost:{type:DataTypes.INTEGER,defaultValue:0},
        user_id:DataTypes.INTEGER.UNSIGNED
              
        
    }, {
        timestamps: true,
        underscored: true
    });

}

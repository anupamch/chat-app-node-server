module.exports =function(sequelize, DataTypes){


    return sequelize.define('messages',{
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: DataTypes.TEXT,
        from: DataTypes.INTEGER,
        to: DataTypes.INTEGER,
        is_read:{type:DataTypes.BOOLEAN,defaultValue:false}  
    }, {
        timestamps: true,
        underscored: true
        
    });
   
}
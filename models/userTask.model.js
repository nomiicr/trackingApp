module.exports= (sequelize,DataTypes)=>{
    let model = sequelize.define('userTask',{
        userId:{
            type : DataTypes.INTEGER
        },
        taskId : {
            type : DataTypes.INTEGER
        }
    })
    return model;
}
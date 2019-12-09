module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('meetings', {
        clientId: {
            type: DataTypes.INTEGER
        },
        salesManId: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATEONLY
        },
        title:{
            type:DataTypes.STRING
        },
        description:{
            type: DataTypes.TEXT
        }
        
    })
    model.associate = function (models) {
        this.belongsTo(models.user, {
            as: 'client',
            foreignKey: 'clientId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.user, {
            as: 'salesMan',
            foreignKey: 'salesManId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.hasOne(models.tracking, {
            foreignKey: 'meetingId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
    }
    return model
}
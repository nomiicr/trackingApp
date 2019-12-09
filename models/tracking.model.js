module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('tracking', {
        userId: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATEONLY
        },
        latitude: {
            type: DataTypes.DOUBLE
        },
        longitude: {
            type: DataTypes.DOUBLE
        },
        taskId: {
            type: DataTypes.INTEGER
        },
        meetingId : {
            type : DataTypes.INTEGER
        }
    })
    model.associate = function (models) {
        this.belongsTo(models.user, {
            as: 'user', foreignKey: 'userId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.task, {
            as: 'task', foreignKey: 'taskId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        }),
        this.belongsTo(models.meetings, {
            as: 'meeting', foreignKey: 'meetingId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
    }
    return model;
}
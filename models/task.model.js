module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('task', {

        date: {
            type: DataTypes.DATEONLY
        },
        dueDate: {
            type: DataTypes.DATEONLY
        },

        completed: {
            type: DataTypes.BOOLEAN
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        createdBy: {
            type: DataTypes.INTEGER
        }
    })

    model.associate = function (models) {
        this.belongsToMany(models.user, { through: { model: models.userTask }, foreignKey: 'taskId' });
        this.belongsTo(models.admin, {
            as: 'owner',
            foreignKey: 'createdBy',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

    }
    return model
}
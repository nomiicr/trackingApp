module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('attendence', {
        userId: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATEONLY
        },
        checkInTime: {
            type: DataTypes.TIME
        },
        checkOutTime: {
            type: DataTypes.TIME,
        },
        isPresent: {
            type: DataTypes.BOOLEAN,

        },

        updatedBy: {
            type: DataTypes.INTEGER,
        }
    })
    model.associate = function (models) {
        this.belongsTo(models.user, {
            as: 'user',
            foreignKey: 'userId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.admin, {
            as: 'admin',
            foreignKey: 'updatedBy',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

    }
    return model
}
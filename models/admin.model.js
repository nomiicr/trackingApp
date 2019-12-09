


module.exports = (sequelize, DataTypes) => {
    var model = sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING,

        },
        lastName: {
            type: DataTypes.STRING,

        },
        address: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue : 1
        },
        roleId: {
            type: DataTypes.INTEGER
        },
        isEmailVerified: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isAllowed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    })
    model.associate = function (models) {
        this.belongsTo(models.role, {
            as: 'role',
            foreignKey: 'roleId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        });

    }
    return model
}




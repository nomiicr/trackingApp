module.exports = (sequelize, DataTypes) => {
    var model = sequelize.define('company', {
        name: {
            type: DataTypes.STRING,


        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,

        },
        website: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING
        },

        address: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },

        isEmailVerified: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isAllowed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        createdBy: {
            type: DataTypes.INTEGER
        }

    })
    model.associate = function (models) {
        this.belongsTo(models.admin, {
            as: 'created',
            foreignKey: 'createdBy',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        });
        this.hasMany(models.user, {
            as: 'comapanyUser',
            foreignKey: 'companyId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        });

    }
    return model
}
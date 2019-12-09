module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('user', {

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
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
        image: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        adminId: {
            type: DataTypes.INTEGER
        },
        salesmanId: {
            type: DataTypes.INTEGER
        },
        roleId: {

            type: DataTypes.INTEGER
        },
        companyName: {
            type: DataTypes.STRING
        },
        companyWebsite: {
            type: DataTypes.STRING
        },

        address: {
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING
        },
        imei: {
            type: DataTypes.STRING
        },
        isEmailVerified: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isLoginAllowed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        companyId : {
            type : DataTypes.INTEGER
        }


    })
    model.associate = function (models) {
        this.belongsTo(models.role, {
            as: 'role',
            foreignKey: 'roleId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.admin, {
            as: 'admin', foreignKey: 'adminId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.user, {
            as: 'salesman', foreignKey: 'salesmanId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.company, {
            as: 'company', foreignKey: 'companyId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

        this.belongsToMany(models.task, { through: { model: models.userTask }, foreignKey: 'userId' });

    }




    return model
}
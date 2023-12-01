const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Person', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name'
        },
        address: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        geoCoding: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            isEmail: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
}
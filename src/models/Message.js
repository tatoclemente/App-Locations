const { DataTypes, UUIDV4 } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define(
        'Message',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: UUIDV4,
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roomId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            msg: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
    )
}
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connection');


class User extends Model { };

// User Schema
User.init(
    {
        username: DataTypes.STRING,
        email: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "User"
    }
)


module.exports = User
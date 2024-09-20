const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connection');


class Like extends Model { };

Like.init(
    {
        reactionType: DataTypes.STRING,
        createdAt: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "Like"
    }
)
 

module.exports = Like
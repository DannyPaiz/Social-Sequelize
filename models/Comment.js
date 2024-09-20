const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connection');


class Comment extends Model { }

Comment.init(
    {
        body: DataTypes.STRING,
        createdAt: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "Comment"
    }
)


module.exports = Comment
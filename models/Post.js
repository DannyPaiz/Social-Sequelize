const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connection');


class Post extends Model { };

Post.init(
    {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        createdAt: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "Post"
    }
)


module.exports = Post
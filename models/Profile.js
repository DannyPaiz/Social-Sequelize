const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connection')


class Profile extends Model { }

// Profile Schema
Profile.init(
    {
        bio: DataTypes.STRING,
        profilePicture: DataTypes.STRING,
        birthday: DataTypes.STRING
    },
    {
        sequelize: sequelize,
        modelName: "Profile"
    }
)


module.exports = Profile
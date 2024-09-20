const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        dialect: 'sqlite',
        storage: path.join(__dirname, 'sequelize.sqlite'),
    }
);

// sequelize.authenticate();

module.exports = {
    sequelize
}
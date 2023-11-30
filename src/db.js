require('dotenv').config()
const { Sequelize } = require('sequelize')
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env
const UserModel = require('./models/User')
const PersonModel = require('./models/Person')

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/location`,
   { logging: false, native: false }
);

UserModel(sequelize)
PersonModel(sequelize)

const { User, Person } = sequelize.models

module.exports = {
    User,
    Person,
    conn: sequelize,
}
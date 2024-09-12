'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {    }

    static async createUser(data) {
      const { name, email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 10);
      return this.create({ name, email, password: hashedPassword });
    }

    static async findByEmail(email) {
      return this.findOne({ where: { email } });
    }

    static generateToken(user) {
      return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    static async validatePassword(enteredPassword, storedPassword) {
      return bcrypt.compare(enteredPassword, storedPassword);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING(245),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(245),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(245),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
  });

  return User;
};

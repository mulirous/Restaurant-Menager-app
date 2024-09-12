'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cardapio extends Model {
    static associate(models) {    }

    static async getAll() {
      return this.findAll({ where: { status: 1 } });
    }

    static async createMenu(data) {
      return this.create(data);
    }

    static async updateStatus(id) {
      return this.update({ status: 2 }, { where: { id } });
    }
  }

  Cardapio.init({
    nome: {
      type: DataTypes.STRING(235),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Cardapio',
    tableName: 'cardapio',
    timestamps: false 
  });

  return Cardapio;
};

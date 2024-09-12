'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    static associate(models) {    }

    static async getAll() {
      return this.findAll({ where: { status: 1 } });
    }

    static async createWorker(data) {
      return this.create(data);
    }

    static async updateStatus(id) {
      return this.update({ status: 2 }, { where: { id } });
    }
  }

  Funcionario.init({
    nome: {
      type: DataTypes.STRING(235),
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING(235),
      allowNull: false
    },
    salario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    data_contratacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURDATE()')
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionarios',
    timestamps: false 
  });

  return Funcionario;
};

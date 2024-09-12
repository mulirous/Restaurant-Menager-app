'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      this.belongsTo(models.Cliente, { foreignKey: 'cliente_id' }); // Associação com Cliente
    }

    static async getAll() {
      return this.findAll({ where: { status: 1 }, include: 'Cliente' });
    }

    static async createBooking(data) {
      return this.create(data);
    }

    static async updateStatus(id) {
      return this.update({ status: 2 }, { where: { id } });
    }
  }

  Reserva.init({
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id'
      }
    },
    data_reserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURDATE()')
    },
    hora_reserva: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURTIME()')
    },
    num_pessoas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas',
    timestamps: false
  });

  return Reserva;
};

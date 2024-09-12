'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      this.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
      this.hasMany(models.Item, { foreignKey: 'pedido_id', as: 'items' });
    }

    static async createOrder(cliente_id, total, items) {
      const pedido = await this.create({ cliente_id, total });
      const pedido_id = pedido.id;

      const Item = sequelize.models.Item;

      await Item.bulkCreate(items.map(item => ({ pedido_id, cardapio_id: item })));
      return pedido;
    }

    static async getAllOrders() {
      return this.findAll({ where: { status: 1 }, include: 'Cliente' });
    }

    static async updateStatus(id) {
      return this.update({ status: 2 }, { where: { id } });
    }

    static async updateStatusDelivered(id) {
      return this.update({ status: 3 }, { where: { id }});
    }
  }

  Pedido.init({
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clientes',
        key: 'id'
      }
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURDATE()')
    },
    hora_pedido: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.literal('CURTIME()')
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: false
  });

  return Pedido;
};

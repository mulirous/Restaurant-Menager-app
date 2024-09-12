'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      this.belongsTo(models.Pedido, { foreignKey: 'pedido_id' });
      this.belongsTo(models.Cardapio, { foreignKey: 'cardapio_id', as: 'cardapio' });
    }
  }


  Item.init({
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Pedido',
        key: 'id'
      },
      primaryKey: true,
    },
    cardapio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cardapio',
        key: 'id'
      },
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'itens',
    timestamps: false
  });

  return Item;
};

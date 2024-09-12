'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cliente extends Model {
        static associate(models) {  }

        static async getAll() {
        return await this.findAll({ where: { status: 1 } });
        }

        static async createCliente(data) {
        return await this.create({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            status: 1 
        });
        }

        static async updateStatus(id) {
        return await this.update({ status: 2 }, { where: { id } });
        }
    }

    Cliente.init({
        nome: {
        type: DataTypes.STRING(235),
        allowNull: false
        },
        email: {
        type: DataTypes.STRING(235),
        allowNull: false,
        unique: true
        },
        telefone: {
        type: DataTypes.STRING(15),
        allowNull: false
        },
        data_registro: {
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
        modelName: 'Cliente',
        tableName: 'clientes',
        timestamps: false
    });

    return Cliente;
};

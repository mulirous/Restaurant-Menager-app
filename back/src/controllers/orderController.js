const { Pedido, sequelize } = require('../models');

exports.createOrder = async (req, res) => {
    const { cliente_id, total, items } = req.body;

    if (!cliente_id || !total || !items || items.length === 0) {
        return res.status(400).json({ error: "Dados incompletos para criar o pedido" });
    }

    try {
        const order = await Pedido.createOrder(cliente_id, total, items);
        res.status(201).json({ message: "Pedido criado com sucesso", orderId: order.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao criar o pedido" });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Pedido.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pedidos" });
        console.log(err)
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Pedido.findByPk(id, {
            include: [
                { model: sequelize.models.Cliente }, 
                { 
                    model: sequelize.models.Item, 
                    as: 'items',
                    include: [{ model: sequelize.models.Cardapio, as: 'cardapio' }]
                }
            ]
        });
        
        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar o pedido" });
        console.log(err);
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    try {
        if (status === 2) {
            await Pedido.updateStatus(id);
        } else if (status === 3) {
            await Pedido.updateStatusDelivered(id); 
        } else {
            return res.status(400).json({ message: "Status inválido" });
        }

        res.status(200).json({ message: `Status do pedido atualizado para ${status} com sucesso` });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar status do pedido" });
        console.log(error);
    }
};

exports.getDeliveredOrders = async (req, res) => {
    try {
        const deliveredOrders = await Pedido.findAll({
            where: { status: 3 },
            include: 'Cliente',
        });
        res.status(200).json(deliveredOrders);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pedidos entregues" });
        console.log(err);
    }
};


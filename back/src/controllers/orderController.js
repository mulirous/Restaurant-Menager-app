const { Pedido, sequelize } = require('../models');

exports.createOrder = async (req, res) => {
    const { cliente_id, total, items } = req.body;

    if (!cliente_id || !total || !items || items.length === 0) {
        return res.status(400).json({ error: "Dados incompletos para criar o pedido" });
    }

    try {
        const order = await Pedido.createOrder(cliente_id, total, items);  // Criando um novo pedido
        res.status(201).json({ message: "Pedido criado com sucesso", orderId: order.id });
    } catch (err) {
        console.error(err);  // Verifica o erro
        res.status(500).json({ error: "Erro ao criar o pedido" });
    }
};


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Pedido.getAllOrders();  // Buscando todos os pedidos
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
                { model: sequelize.models.Cliente },  // Associação com Cliente
                { 
                    model: sequelize.models.Item, 
                    as: 'items', // Use o alias definido
                    include: [{ model: sequelize.models.Cardapio, as: 'cardapio' }]  // Inclua o Cardapio com alias
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

    try {
        await Pedido.updateStatus(id);  // Atualizando status do pedido
        res.status(200).json({ message: "Status do pedido atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar status do pedido" });
        console.log(error);
    }
};

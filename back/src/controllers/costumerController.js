const { Cliente } = require('../models');

exports.getAllCostumers = async (req, res) => {
    try {
        const costumers = await Cliente.getAll();
        res.status(200).json(costumers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar clientes' });
        console.log(error);
    }
};

exports.createCostumer = async (req, res) => {
    try {
        const costumerId = await Cliente.createCliente(req.body);
        res.status(201).json({ id: costumerId });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar cliente' });
        console.log(error);
    }
};

exports.updateCostumerStatus = async (req, res) => {
    const { id } = req.params;
    try {
        await Cliente.updateStatus(id);
        res.status(200).json({ message: "Status atualizado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o status\n'});
        console.log(error);
    }
}
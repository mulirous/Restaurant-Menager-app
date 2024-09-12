const { Funcionario } = require('../models');

exports.getAllWorker = async (req, res) => {
    try {
        const workers = await Funcionario.getAll();  // Usando o método estático `getAll`
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar funcionários' });
    }
};

exports.createWorker = async (req, res) => {
    try {
        const worker = await Funcionario.createWorker(req.body);  // Usando o método estático `createWorker`
        res.status(201).json({ id: worker.id });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar Funcionário' });
    }
};

exports.updateWorkerStatus = async (req, res) => {
    const { id } = req.params;
    try {
        await Funcionario.updateStatus(id);  // Atualizando status
        res.status(200).json({ message: "Status atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o status' });
    }
};

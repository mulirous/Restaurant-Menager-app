const { Cardapio } = require('../models');

exports.getAllMenu = async (req, res) => {
    try {
        const menu = await Cardapio.getAll();  // Usando o método estático `getAll`
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar opção do menu' });
    }
};

exports.createMenu = async (req, res) => {
    try {
        const menu = await Cardapio.createMenu(req.body);  // Criando uma nova opção de cardápio
        res.status(201).json({ id: menu.id });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar opção do menu' });
    }
};

exports.updateMenuStatus = async (req, res) => {
    const { id } = req.params;
    try {
        await Cardapio.updateStatus(id);  // Atualizando status da opção do menu
        res.status(200).json({ message: "Status atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar o status do menu' });
    }
};

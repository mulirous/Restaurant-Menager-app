const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findByEmail(email);  // Usando o método findByEmail do modelo
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        const user = await User.createUser({ name, email, password }); // Usando o método createUser do modelo
        res.status(201).json({ id: user.id });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao cadastrar o usuário.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email); // Usando o método findByEmail do modelo
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await User.validatePassword(password, user.password); // Validando senha
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const token = User.generateToken(user); // Gerando token JWT
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao fazer login.' });
    }
};

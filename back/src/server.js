require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Certifique-se de que isso está apontando para a sua configuração do Sequelize

const costumerRoutes = require('./routes/costumerRoutes');
const menuRoutes = require('./routes/menuRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const workerRoutes = require('./routes/workerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/costumers', costumerRoutes);
app.use('/menu', menuRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/workers', workerRoutes);
app.use('/booking', bookingRoutes);


sequelize.sync({ alter: true }) // 'alter: true' ajusta a estrutura das tabelas sem recriar ou apagar dados
    .then(() => {
        console.log('Banco de dados sincronizado');
        
        // Iniciar o servidor depois da sincronização
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
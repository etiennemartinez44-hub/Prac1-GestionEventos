require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const recintosRouter = require('./routes/recintos');
app.use('/recintos', recintosRouter);

const iniciarServidor = async () => {
    try {
        await mongoose.connect(process.env.URL_BD);
        console.log('Conexión con mongoDB establecida.');

        const puerto = process.env.PORT || 3000;
        app.listen(puerto, () => {
            console.log(`Servidor escuchando en el puerto ${puerto}`);
        }); 
    } catch (error) {
        console.error('Error al iniciar el servidor:', error.message);
    }
};

const eventosRouter = require('./routes/eventos');
app.use('/eventos', eventosRouter);

iniciarServidor();
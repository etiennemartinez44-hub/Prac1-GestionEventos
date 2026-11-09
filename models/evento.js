const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        minlength: 3
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    disponibles: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: 'El número de entradas disponibles debe ser entero.'
        }
    }
});

const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5
    },
    fecha: {
        type: Date,
        required: true
    },
    recinto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recintos',
        required: true
    },
    entradas: {
        type: [entradaSchema]
    }
});

const Evento = mongoose.model('eventos', eventoSchema);

module.exports = Evento;
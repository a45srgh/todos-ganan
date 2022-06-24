const mongoose = require('mongoose');

const jugadorSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    paterno: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    materno: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    telefono: {
        type: String,
        required: true,
        min: 12,
        max: 12
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    calle: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    exterior: {
        type: String,
        required: false,
        min: 1,
        max: 10
    },
    interior: {
        type: String,
        required: false,
        min: 1,
        max: 5
    },
    colonia: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    municipio: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    estado: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    cp: {
        type: String,
        required: true,
        min: 5,
        max: 5
    }
})

module.exports = mongoose.model('Jugador', jugadorSchema); //modelo es como se va llamar la base en mongo
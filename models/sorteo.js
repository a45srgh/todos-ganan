const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sorteoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    costo: {
        type: Number,
        required: true,
        min: 2,
        max: 255
    },
    descripcion: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    premios: [{
        type: Schema.Types.ObjectId,
        ref: "Premio"
    }],
    jugadores: [{
        type: Schema.Types.ObjectId,
        ref: "jugadore"
    }]
})

module.exports = mongoose.model('Sorteo', sorteoSchema); //modelo es como se va llamar la base en mongo

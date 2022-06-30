const mongoose = require('mongoose');

const sorteoRoutes = mongoose.Schema({
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
    }
        
})

module.exports = mongoose.model('Sorteo', sorteoRoutes); //modelo es como se va llamar la base en mongo

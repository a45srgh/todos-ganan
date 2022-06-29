const mongoose = require('mongoose');

const sorteoRoutes = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    costo: {
        type: String,
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
        type: String,
        required: true,
        min: 12,
        max: 12
    },
    fechaFinal: {
        type: String,
        required: true,
        min: 6,
        max: 100
    }
        
})

module.exports = mongoose.model('Sorteo', sorteoRoutes); //modelo es como se va llamar la base en mongo

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
        min: 10,
        max: 10
    },
    fechaFinal: {
        type: String,
        required: true,
        min: 10,
        max: 10
    }
        
})

module.exports = mongoose.model('Sorteo', sorteoRoutes); //modelo es como se va llamar la base en mongo

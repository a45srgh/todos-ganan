const mongoose = require('mongoose');

const premioSchema = mongoose.Schema({
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
        max: 1000000
    },
    caracteristicas: {
        type: String,
        required: true,
        min: 2,
        max: 500
    },
    tags: [{
        type: String
    }]
})

module.exports = mongoose.model('Premio', premioSchema);

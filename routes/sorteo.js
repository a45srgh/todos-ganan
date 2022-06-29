const router = require('express').Router();
const Jugador = require('../models/Sorteo');
const Joi = require('@hapi/joi');
const sorteo = require('../models/Sorteo');


const sorteoSchema = Joi.object({

    nombre: Joi.string().min(2).max(255).required(),
    costo: Joi.string().min(2).max(255).required(),
    descripcion: Joi.string().min(2).max(255).required(),
    inicio: Joi.string().min(12).max(12).required(),
    final: Joi.string().min(6).max(100).required().email()
    
})

router.post('/', async (req, res) => {
    const { error } = sorteoSchema.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }    
    const sorteo = new Sorteo({

        nombre: req.body.nombre,
        costo: req.body.costo,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.inicio,
        fechaFinal: req.body.final,
        
    });

    try {
        const saveSorteo= await sorteo.save();
        res.json({
            error: null,
            data: saveSorteo
        })
    } catch (error) {
        res.status(400).json({error})
    }       
})

module.exports = router;

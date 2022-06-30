const router = require('express').Router();
const Joi = require('@hapi/joi').extend(require('@joi/date'));
const Sorteo = require('../models/sorteo');


const sorteoSchema = Joi.object({
    nombre: Joi.string().min(2).max(255).required(),
    costo: Joi.number().min(1).max(1000000).required(),
    descripcion: Joi.string().min(2).max(255).required(),
    inicio: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required(),
    final: Joi.date().format('YYYY-MM-DD HH:mm:ss').utc().required()
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

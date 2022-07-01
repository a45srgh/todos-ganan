const router = require('express').Router();
const Joi = require('@hapi/joi').extend(require('@joi/date'));
const Premio = require('../models/Premio');


const premioSchema = Joi.object({
   
    nombre: Joi.string().min(2).max(255).required(),
    costo: Joi.number().min(2).max(1000000).required(),
    caracteristicas: Joi.string().min(2).max(500).required(),
    tags: Joi.string().required()
    
})

router.post('/', async (req, res) => {
    const { error } = premioSchema.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }    
    const premio = new Premio({

        nombre: req.body.nombre,
        costo: req.body.costo,
        caracteristicas: req.body.caracteristicas,
        tags: req.body.tags
        
        
    });

    try {
        const savePremio= await premio.save();
        res.json({
            error: null,
            data: savePremio
        })
    } catch (error) {
        res.status(400).json({error})
    }       
})

module.exports = router;
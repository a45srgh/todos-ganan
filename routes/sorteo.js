const router = require('express').Router();
const Joi = require('@hapi/joi');
const Sorteo = require('../models/sorteo');


const sorteoSchema = Joi.object({

    nombre: Joi.string().min(2).max(255).required(),
    costo: Joi.string().min(2).max(255).required(),
    descripcion: Joi.string().min(2).max(255).required(),
    inicio: Joi.string().min(10).max(10).required(),
    final: Joi.string().min(10).max(10).required()
    
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

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        const sorteoDB = await Sorteo.findByIdAndDelete({ _id: id });
        console.log(sorteoDB)
       
            if (!sorteoDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'sorteo eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;

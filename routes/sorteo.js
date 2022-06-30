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

router.put('/:id', async (req, res) => {
    
    const id = req.params.id;
    const body = req.body;

    const { error } = sorteoSchema.validate(body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }    
    console.log(id)
    console.log('body', body)

    const sorteo = {

        nombre: body.nombre,
        costo: body.costo,
        descripcion: body.descripcion,
        fechaInicio: body.inicio,
        fechaFinal: body.final,

    };

    try {
        const sorteoDB = await Sorteo.findByIdAndUpdate(
            id, sorteo, { useFindAndModify: false }
        )
        console.log(sorteoDB)
        res.json({
            estado: true,
            mensaje: 'editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Fallo modificacion'
        })
    }
})

module.exports = router;

const router = require('express').Router();
const Joi = require('@hapi/joi');
const Premio = require('../models/premio');

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        
        const premioDB = await Premio.findByIdAndDelete({ _id: id });
        console.log(premioDB)
       
            if (!premioDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'premio eliminado!'
            })
        }
        
    } catch (error) {
        console.log(error)
   }
})

module.exports = router;

const router = require('express').Router();
const Jugador = require('../models/Jugador');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const schemaRegister = Joi.object({

    nombre: Joi.string().min(2).max(255).required(),
    paterno: Joi.string().min(2).max(255).required(),
    materno: Joi.string().min(2).max(255).required(),
    telefono: Joi.string().min(12).max(12).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(12).required(),
    date: Joi.string().min(6).max(1024).required(),
    calle: Joi.string().min(6).max(255).required(),
    exterior: Joi.string().min(1).max(10).required(),
    interior: Joi.string().min(1).max(5).required(),
    colonia: Joi.string().min(2).max(255).required(),
    municipio: Joi.string().min(2).max(255).required(),
    estado: Joi.string().min(4).max(100).required(),
    cp: Joi.string().min(5).max(5).required()
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(12).required()
})

router.post('/register', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const isEmailExist = await Jugador.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    console.log("****"+req.body.password);
    console.log("******"+password);

    const jugador = new Jugador({

        nombre: req.body.nombre,
        paterno: req.body.paterno,
        materno: req.body.materno,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date,
        calle: req.body.calle,
        exterior: req.body.exterior,
        interior: req.body.interior,
        colonia: req.body.colonia,
        municipio: req.body.municipio,
        estado: req.body.estado,
        cp: req.body.cp
    });

    try {
        const saveJugador = await jugador.save();
        res.json({
            error: null,
            data: saveJugador
        })
    } catch (error) {
        res.status(400).json({error})
    }       
})

module.exports = router;
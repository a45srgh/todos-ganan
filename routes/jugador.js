const router = require('express').Router();

const Jugador = require('../models/Jugador')

router.get('/', async (req, res) => {
    try {
        const arrayJugador = await Jugador.find();
        console.log(arrayJugador)
        res.json(arrayJugador)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
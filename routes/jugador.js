const router = require('express').Router();

router.get('/', async (req, res) => {  //consulta todos los jugadores (get)

    res.json({
        error: null,
        data: 'aquí va ir la data'
    })
})

module.exports = router;
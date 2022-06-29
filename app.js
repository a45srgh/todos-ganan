const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.d7vx9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

const authRoutes = require('./routes/auth');
const jugadorRoutes = require('./routes/jugador');
const sorteoRoutes = require('./routes/sorteo');
const verifyToken = require('./routes/validate-token');

app.use('/api/user', authRoutes);
app.use('/api/jugador', jugadorRoutes);
app.use('/api/sorteo', verifyToken, sorteoRoutes); //TODO AQUI VOY A MODIFICAR PARA HACERLO PRIVADO

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`);
})
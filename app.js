const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ncdk5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

const authRoutes = require('./routes/auth');
const jugadorRoutes = require('./routes/jugador');

app.use('/api/user', authRoutes);
app.use('/api/jugador', jugadorRoutes);

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
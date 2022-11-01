const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');


const {
    getCards,
    createCard,
    deleteCard
  } = require('./controllers/cards');

const { PORT = 3002 } = process.env;

const app = express(); 
app.use(express.json());

app.use(cors);

app.get('/cards', getCards);
app.post('/cards', createCard);
app.delete('/cards/:cardId', deleteCard);

mongoose.connect('mongodb://localhost:27017/quizdb');

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
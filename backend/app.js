const express = require('express');
const mongoose = require('mongoose');


const {
    getCards,
    createCard,
  } = require('./controllers/cards');

const { PORT = 3002 } = process.env;

const app = express(); 
app.use(express.json());

app.get('/cards', getCards);

app.post('/cards', createCard);

mongoose.connect('mongodb://localhost:27017/quizdb');

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
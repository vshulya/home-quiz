const Card = require('../models/card');

// GET /cards
module.exports.getCards = (_, res, next) => {
  res.send('what')
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// POST /cards
module.exports.createCard = (req, res, next) => {
  const { question, answer, hint } = req.body;

  Card.create({
    question, answer, hint
  })
    // return data to db
    .then((card) => res.status(201).send(card))
    .catch(next);
};
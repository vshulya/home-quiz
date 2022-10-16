const Card = require('../models/card');

// GET /cards
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

// POST /cards
module.exports.createCard = (req, res, next) => {
  const { question, answer, hint } = req.body;

  Card.create({question, answer, hint })
    // return data to db
    .then((card) => res.status(201).send(card))
    .catch(next);
};

// DELETE /cards/:cardId
module.exports.deleteCard = (req, res, next) => {
  const {cardId} = req.params;
  Card.findById(cardId)
  .then((card) => {
    if (!card) {
      return next('Card not found');
    }
    return card.remove() 
    .then(() => {
      res.send({ message: 'Card has been deleted' })
    })
  })
  .catch(next);
};
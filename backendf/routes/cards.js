const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getCards, createCard } = require('../controllers/cards');

// GET /cards
router.get(
  '/',
  getCards
)

// POST /cards
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      question: Joi.string().min(2).max(200).required(),
      answer: Joi.string().min(2).max(200).required(),
      hint: Joi.string(),
    }),
  }),
  createCard,
);
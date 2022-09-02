import React, { useEffect } from 'react';
import { useState } from 'react';
import './Main.css';
import Card from '../Card/Card';
import {initialQuestions} from '../../utils/constants'

function Main () {
  const [gameScore, setGameScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [chosenCardIdx, setChosenCardIdx] = useState(-1);
  const [disabledCardsList, setDisabledCardsList] = useState([]);

  const isDisabled = (card) => disabledCardsList.some(c => {
    debugger
    return c.id === card.id;
  });
  // const disabled = disabledCardsList.indexOf(chosenCardIdx)
  const rightAnswer = 'Yes';
  const wrongAnswer = 'No';
  
  const shuffleQuestions = () => {
      const shuffledCards = [...initialQuestions]
      .sort(() => Math.random() -0.5)
      .map((card) => ({...card, id: Math.random() }));
      setCards(shuffledCards); 
      setChosenCardIdx(-1);
      setGameScore(0);
      setPlayerScore(0);
  }

  const getQuestion = () => {
    const question = Math.floor(Math.random()*cards.length);
    setChosenCardIdx(question);
  }

  const handleCheckAnswer = () => {
    debugger
    const index = chosenCardIdx;
    rightAnswer ?
      setPlayerScore(prevPlScore => prevPlScore+1) :
      setGameScore(prevGScore => prevGScore+1)
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
  }

  useEffect(() =>{
    shuffleQuestions();
  }, [])

  return (
    <div className='main'>
      <h1 className='main__title'>Game vs You</h1>
      <p className='main__description'>This quiz is a fun and unique experience for a fun home party with your friends. All questions do not assume that you know the answer like in most quizes, but invite you to think and analyze and come to the correct answer yourself.</p>
      <button className='main__button' onClick={shuffleQuestions}>Let's the game begin!</button>
      <button className='main__button' onClick={getQuestion}>Choose the question</button>
      <p>Score: {gameScore} : {playerScore}</p>
      <div className='main__grid'> {
        cards.map((card, index) => (
          <Card 
            key={card.id}
            card={card} 
            question={card.question}
            answer={card.answer}
            hint={card.hint}
            getQuestion={getQuestion}
            isChosen={chosenCardIdx === index}
            disabled={isDisabled}
          />
        ))}
      </div>
      <p className='main__answer-check'>Is it your answer?</p>
      <button className='main__button' onClick={handleCheckAnswer}>{rightAnswer}</button>
      <button className='main__button' onClick={handleCheckAnswer}>{wrongAnswer}</button>
      {/* <Timer />  */}
    </div>
  );
}

export default Main;
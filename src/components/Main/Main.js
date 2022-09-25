import React, { useEffect } from 'react';
import { useState } from 'react';
import './Main.css';
import Card from '../Card/Card';
import {initialQuestions} from '../../utils/constants'
import Timer from '../Timer/Timer';

function Main () {
  const [gameScore, setGameScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [chosenCardIdx, setChosenCardIdx] = useState(-1);
  const [disabledCardsList, setDisabledCardsList] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isTimeForAnswer, setIsTimeForAnswer] = useState(false);


  const isDisabled = (testCardIdx) => disabledCardsList.some(disabledCardIdx => {
    return testCardIdx === disabledCardIdx;
  });

  useEffect(() => {
      let interval = null;
      if (isTimerActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isTimerActive && seconds !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isTimerActive, seconds])

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
      setDisabledCardsList([]);
  }

  const getQuestion = () => {
    const question = Math.floor(Math.random()*cards.length);
    setChosenCardIdx(question);
    setIsTimerActive(true);
  }

  useEffect(() => {
    if (seconds === 3)
    setIsTimerActive(false);
  }, [seconds])

  useEffect(() => {
    if (seconds === 3)
    setIsTimeForAnswer(true);
  }, [isTimerActive])

  const handleRightAnswer = () => {
    const index = chosenCardIdx;
    setPlayerScore(prevPlScore => prevPlScore+1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
    console.log('updatedDisabledCardsList', updatedDisabledCardsList);
  }

  const handleWrongAnswer = () => {
    const index = chosenCardIdx;
    setGameScore(prevGScore => prevGScore+1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
  }

  useEffect(() =>{
    shuffleQuestions();
  }, [])

  return (
    <div className='main'>
      <h1 className='main__title'>Game vs You</h1>
      <p className='main__score'>Score: {gameScore} : {playerScore}</p>
      {/* <p className='main__description'>This quiz is a fun and unique experience for a fun home party with your friends. All questions do not assume that you know the answer like in most quizes, but invite you to think and analyze and come to the correct answer yourself.</p> */}
      <button className='button main__button-newquestion' onClick={getQuestion}>Choose the question</button>
      <Timer 
        seconds={seconds} 
        isTimeForAnswer={isTimeForAnswer}
      />
      <div className='main__grid'> {
        cards.map((card, index) => (
          <Card 
            key={index}
            card={card} 
            question={card.question}
            answer={card.answer}
            hint={card.hint}
            getQuestion={getQuestion}
            isChosen={chosenCardIdx === index}
            disabled={isDisabled(index)}
          />
        ))}
      </div>
      <p className='main__answer-check'>Is it your answer?</p>
      <div className='main__button-answer-wrapper'>
        <button className='button main__button-answer' onClick={handleRightAnswer}>{rightAnswer}</button>
        <button className='button main__button-answer' onClick={handleWrongAnswer}>{wrongAnswer}</button>
      </div>
      <div className='main__button-newgame-wrapper'>
        <button className='button main__button-newgame' onClick={shuffleQuestions}>Next game {'>'}></button>
      </div>
    </div>
  );
}

export default Main;
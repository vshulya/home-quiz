import React, { useEffect, useState } from 'react';
import './Main.css';
import Card from '../Card/Card';
import {initialQuestions} from '../../utils/constants'
import Timer from '../Timer/Timer';
import ScoreTooltip from '../ScoreTooltip/ScoreTooltip';
import AnswerTooltip from '../AnswerTooltip/AnswerTooltip';

function Main () {
  const [gameScore, setGameScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [chosenCardIdx, setChosenCardIdx] = useState(-1);
  const [disabledCardsList, setDisabledCardsList] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const [isTimeForAnswer, setIsTimeForAnswer] = useState(false);
  const [isScoreTooltipOpen, setIsScoreTooltipOpen] = useState(false);
  const [isPlayerSucceed, setIsPlayerSucceed] = useState(false);
  const [isAnswerTooltipOpen, setIsAnswerTooltipOpen] = useState(false);
  const [isPlayerAnswerRight, setIsPlayerAnswerRight] = useState(false);

  const closeAllTooltip = () => {
    setIsScoreTooltipOpen(false);
    setIsAnswerTooltipOpen(false);
  }

  useEffect(() => {
    if (playerScore === 2) {
      setTimeout(() => {
        setIsScoreTooltipOpen(true);
        setIsPlayerSucceed(true);
      }, 2000); 
    } else if (gameScore === 2) {
      setTimeout(() => {
      setIsScoreTooltipOpen(true);
      setIsPlayerSucceed(false);
      }, 2000);
    }
  }, [playerScore, gameScore])


  const isDisabled = (testCardIdx) => disabledCardsList.some(disabledCardIdx => {
    return testCardIdx === disabledCardIdx;
  });

  useEffect(() => {
      let interval = null;
      if (isTimerActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
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
      setIsTimeForAnswer(false);
  }

  const getQuestion = () => {
    const question = Math.floor(Math.random()*cards.length);
    setChosenCardIdx(question);
    setSeconds(3);
    setIsTimerActive(true);
    setIsTimeForAnswer(false);
  }

  useEffect(() => {
    if (seconds === 0) setIsTimerActive(false);
  }, [seconds])

  useEffect(() => {
    if (seconds === 0) {
      setTimeout(() => {
        setIsTimeForAnswer(true);
      }, 1000); 
    }
  }, [isTimerActive])


  const handleRightAnswer = () => {
    const index = chosenCardIdx;
    setPlayerScore(prevPlScore => prevPlScore+1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
    console.log('updatedDisabledCardsList', updatedDisabledCardsList);
    setIsTimeForAnswer(false);
    setIsAnswerTooltipOpen(true);
    setIsPlayerAnswerRight(true);
    setTimeout(() => {
      setIsAnswerTooltipOpen(false);
    }, 1000);
    
  }

  const handleWrongAnswer = () => {
    const index = chosenCardIdx;
    setGameScore(prevGScore => prevGScore+1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
    setIsTimeForAnswer(false);
    setIsAnswerTooltipOpen(true);
    setIsPlayerAnswerRight(false);
    
  }

  useEffect(() =>{
    shuffleQuestions();
  }, [])

  return (
    <div className='main'>
      <h1 className='main__title'>Game vs You</h1>
      <p className='main__score'>Score: {gameScore} : {playerScore}</p>
      {/* <p className='main__description'>This quiz is a fun and unique experience for a fun home party with your friends. All questions do not assume that you know the answer like in most quizes, but invite you to think and analyze and come to the correct answer yourself.</p> */}
      <button className='button main__button-newquestion' disabled={isTimeForAnswer || isTimerActive} onClick={getQuestion}>Choose the question</button>
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
            isTimeForAnswer={isTimeForAnswer}
          />
        ))}
      </div>
      <p className='main__answer-check'>Is it your answer?</p>
      <div className='main__button-answer-wrapper'>
        {/* TODO disable longer  */}
        <button className='button main__button-answer' disabled={!isTimeForAnswer} onClick={handleRightAnswer}>{rightAnswer}</button>
        <button className='button main__button-answer' disabled={!isTimeForAnswer} onClick={handleWrongAnswer}>{wrongAnswer}</button>
      </div>
      <div className='main__button-newgame-wrapper'>
        <button className='button main__button-newgame' onClick={shuffleQuestions}>Next game {'>'}</button>
      </div>
      <ScoreTooltip
        onClose={closeAllTooltip}
        isOpen={isScoreTooltipOpen}
        isPlayerSucceed={isPlayerSucceed}
      />
      <AnswerTooltip
        onClose={closeAllTooltip}
        isOpen={isAnswerTooltipOpen}
        isPlayerAnswerRight={isPlayerAnswerRight}
      />
    </div>
  );
}

export default Main;
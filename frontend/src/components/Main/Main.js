import React, { useEffect, useState } from 'react';
import './Main.css';
import Card from '../Card/Card';
import { initialQuestions } from '../../utils/constants';
import { DESKTOP_WIDTH, TABLET_WIDTH, MOBILE_WIDTH } from '../../utils/constants';
import Timer from '../Timer/Timer';
import ScoreTooltip from '../ScoreTooltip/ScoreTooltip';
import AnswerTooltip from '../AnswerTooltip/AnswerTooltip';
import Navigation from '../Navigation/Navigation';
import TooltipRightWrong from '../TooltipRightWrong/TooltipRightWrong';

function Main() {
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
  const [isTooltipRightWrongOpen, setIsTooltipRightWrongOpen] = useState(false);

  const timerMult = 1;

  const isDisabled = (testCardIdx) => disabledCardsList.some(disabledCardIdx => {
    return testCardIdx === disabledCardIdx;
  });

  const restartGame = () => {
    setIsScoreTooltipOpen(false);
    shuffleQuestions();
  }

  //open winning modal if player or game gets max points
  useEffect(() => {
    if (playerScore === 2 ) {
      setTimeout(() => {
        setIsScoreTooltipOpen(true);
        setIsPlayerSucceed(true);
      }, 2000);
    } else if (gameScore === 2) {
      setTimeout(() => {
        setIsScoreTooltipOpen(true);
        setIsPlayerSucceed(false);
      }, 2000*timerMult);
    }
  }, [playerScore, gameScore])

  //start the timer
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000*timerMult);
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds])

  //stop the timer
  useEffect(() => {
    if (seconds === 0) setIsTimerActive(false);
  }, [seconds])

  //open TimeForAnswer
  useEffect(() => {
    if (seconds === 0) {
      setTimeout(() => {
        setIsTimeForAnswer(true);
      }, 1000*timerMult);
    }
  }, [isTimerActive])

  const shuffleQuestions = () => {
    const shuffledCards = [...initialQuestions]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChosenCardIdx(-1);
    setGameScore(0);
    setPlayerScore(0);
    setDisabledCardsList([]);
    setIsTimeForAnswer(false);
  }

  const getQuestion = () => {
    const notDisabledCards = cards.filter((value, i) => 
    {
      return  disabledCardsList.indexOf(i) == -1;
    });

    // console.log("disabledCardsList", disabledCardsList)
    // console.log("cards", cards)
    // console.log("notDisabledCards", notDisabledCards)
    const notDisabledCardIndex = Math.floor(Math.random()* notDisabledCards.length) ;
    console.log(notDisabledCardIndex);
    setChosenCardIdx(cards.findIndex((c)=>c.question == notDisabledCards[notDisabledCardIndex].question));
    setSeconds(3*timerMult);
    setIsTimerActive(true);
    setIsTimeForAnswer(false);
  }

  //change grid or deck depends on window size
  const windowSizeMobile = window.innerWidth <= TABLET_WIDTH;

  const handleScore = (playerWin=false) => {
    const index = chosenCardIdx;
    if(playerWin) setPlayerScore(prevPlScore => prevPlScore + 1);
    else setGameScore(prevGScore => prevGScore + 1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
    console.log("disabledCardsList", disabledCardsList)
  }

  const handleAnswer = (playerWin=false) => {
    if (!isTooltipRightWrongOpen) return;
    setIsTimeForAnswer(false);
    if(playerWin) setIsPlayerAnswerRight(true);
    else setIsPlayerAnswerRight(false);
    setIsTooltipRightWrongOpen(false);
    setIsAnswerTooltipOpen(true);
    setTimeout(() => {
      handleScore(playerWin);
      setIsAnswerTooltipOpen(false);
      setChosenCardIdx(-1);
    }, 1500*timerMult);
  }


  useEffect(() => {
    shuffleQuestions();
  }, [])

  return (
    <div className='main'>
      <h1 className='main__title'>Game vs You</h1>
      <p className='main__score'>Score: {gameScore} : {playerScore}</p>
      <button className='button main__buttonNewQuestion' disabled={isTimeForAnswer || isTimerActive} onClick={getQuestion}>Choose the question</button>
      <Timer
        seconds={seconds}
        isTimeForAnswer={isTimeForAnswer}
      />
      <div className={windowSizeMobile ? 'main__deck' : 'main__grid'}> {
        cards.map((card, index) => (
          <Card
            key={index}
            cardIndex={index}
            card={card}
            question={card.question}
            answer={card.answer}
            hint={card.hint}
            isChosen={chosenCardIdx === index}
            disabled={isDisabled(index)}
            isTimeForAnswer={isTimeForAnswer}
            setIsTooltipRightWrongOpen={setIsTooltipRightWrongOpen}
            windowSizeMobile={windowSizeMobile}
          />
        ))}

      </div>
      <Navigation
        shuffleQuestions={shuffleQuestions} />
      <ScoreTooltip
        onClose={restartGame}
        isOpen={isScoreTooltipOpen}
        isPlayerSucceed={isPlayerSucceed}
      />
      <AnswerTooltip
        isOpen={isAnswerTooltipOpen}
        isPlayerAnswerRight={isPlayerAnswerRight}
      />
      <TooltipRightWrong
        isOpen={isTooltipRightWrongOpen}
        handleAnswer={handleAnswer}
      />
    </div>
  );
}

export default Main;
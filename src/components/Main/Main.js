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

  const isDisabled = (testCardIdx) => disabledCardsList.some(disabledCardIdx => {
    return testCardIdx === disabledCardIdx;
  });

  const closeAllTooltip = () => {
    setIsScoreTooltipOpen(false);
    shuffleQuestions();
  }

  //open winning modal if player or game gets max points
  useEffect(() => {
    if (playerScore === 5 ) {
      setTimeout(() => {
        setIsScoreTooltipOpen(true);
        setIsPlayerSucceed(true);
      }, 2000);
    } else if (gameScore === 5) {
      setTimeout(() => {
        setIsScoreTooltipOpen(true);
        setIsPlayerSucceed(false);
      }, 2000);
    }
  }, [playerScore, gameScore])

  //start the timer
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

  //stop the timer
  useEffect(() => {
    if (seconds === 0) setIsTimerActive(false);
  }, [seconds])

  //open TimeForAnswer
  useEffect(() => {
    if (seconds === 0) {
      setTimeout(() => {
        setIsTimeForAnswer(true);
      }, 1000);
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
    //const filterShortFilm = (moviesToFilter) => moviesToFilter.filter((item) => item.duration <= 40);
    const notDisabledCards = cards.filter((c, i)=>disabledCardsList.indexOf(i) == -1);
    console.log("notDisabledCards", notDisabledCards)
    debugger
    const question = Math.floor(Math.random()* notDisabledCards.length) ;
    console.log(question);
    setChosenCardIdx(question);
    setSeconds(3);
    setIsTimerActive(true);
    setIsTimeForAnswer(false);

  }

  const windowSizeMobile = window.innerWidth < MOBILE_WIDTH;

  // const getQuestionMobile = () => {
  //   const question = Math.floor(Math.random() * cards.length);
  //   setChosenCardIdx(question);
  //   setSeconds(3);
  //   setIsTimerActive(true);
  //   setIsTimeForAnswer(false);
  // }

  const handleGameScore = () => {
    const index = chosenCardIdx;
    setGameScore(prevGScore => prevGScore + 1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    setDisabledCardsList(updatedDisabledCardsList);
  }

  const handlePlayerScore = () => {
    const index = chosenCardIdx;
    setPlayerScore(prevPlScore => prevPlScore + 1);
    const updatedDisabledCardsList = [...disabledCardsList, index];
    debugger
    setDisabledCardsList(updatedDisabledCardsList);
  }

  const handleRightAnswer = () => {
    if (!isTooltipRightWrongOpen) return;
    setIsTimeForAnswer(false);
    setIsPlayerAnswerRight(true);
    setIsTooltipRightWrongOpen(false);
    setIsAnswerTooltipOpen(true);
    setTimeout(() => {
      handlePlayerScore();
      setIsAnswerTooltipOpen(false);
      setChosenCardIdx(-1);
    }, 1500);
  }

  const handleWrongAnswer = () => {
    if (!isTooltipRightWrongOpen) return;
    setIsTimeForAnswer(false);
    setIsPlayerAnswerRight(false);
    setIsTooltipRightWrongOpen(false);
    setIsAnswerTooltipOpen(true);
    setTimeout(() => {
      handleGameScore();
      setIsAnswerTooltipOpen(false);
      setChosenCardIdx(-1);
    }, 1500);
  }

  useEffect(() => {
    shuffleQuestions();
  }, [])

  return (
    <div className='main'>
      <h1 className='main__title'>Game vs You</h1>
      <p className='main__score'>Score: {gameScore} : {playerScore}</p>
      <button className='button main__buttonNewQuestion' disabled={isTimeForAnswer || isTimerActive} onClick={getQuestion}>Choose the question</button>
      {/* <button className={windowSizePC ? 'main__buttonNewQuestion' : 'main__buttonNewQuestion_hidden'} disabled={isTimeForAnswer || isTimerActive} onClick={getQuestion}>Choose the question</button> */}
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
        onClose={closeAllTooltip}
        isOpen={isScoreTooltipOpen}
        isPlayerSucceed={isPlayerSucceed}
      />
      <AnswerTooltip
        isOpen={isAnswerTooltipOpen}
        isPlayerAnswerRight={isPlayerAnswerRight}
      />
      <TooltipRightWrong
        isOpen={isTooltipRightWrongOpen}
        handleRightAnswer={handleRightAnswer}
        handleWrongAnswer={handleWrongAnswer}
      />
    </div>
  );
}

export default Main;
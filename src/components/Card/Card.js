import React, { useEffect, useState } from 'react';
import './Card.css';
import cover from '../../images/cover.jpg';


function Card ({question, answer, hint, isChosen, disabled, isTimeForAnswer, setIsTooltipRightWrongOpen, getQuestionMobile}) {

  const [isClicked, setIsClicked] = useState(false);
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);

  useEffect(() => {
    if (isTimeForAnswer) {
      setTimeout(() => {
        setShowCheckAnswer(true);
      }, 2000); 
    } else {
      setShowCheckAnswer(false);
    }
  }, [isTimeForAnswer])

  const handleAnswerCheck = () => {
    setIsClicked(true); 
    setTimeout(() => {
      setIsTooltipRightWrongOpen(true);
    }, 2000); 
  }

    return (
      <div className='card'>
        <div className={disabled ? 'card__disabled' : ''}>
          <div className={isChosen ? 'card__flipped' : ''}>
            <div className='card__front'>
              <p className='card__question'>{question}</p>
              <button className={showCheckAnswer ? 'button card__answer-button' : 'button card__answer-button card__answer-button_hidden'} onClick={handleAnswerCheck}>Check the answer</button>
              <div className={!isClicked ? 'card__answer' : 'card__answer_active'}> 
                <p className='card__answer-answer'>{answer}</p>
                <p className='card__answer-hint'>{hint}</p>
              </div>
            </div>
            <div className='card__cover'></div>
          </div>
        </div> 
      </div>
  );
}

export default Card;
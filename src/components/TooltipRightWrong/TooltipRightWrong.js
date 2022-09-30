import React from 'react';
import './TooltipRightWrong.css';

function TooltipRightWrong({isOpen, handleRightAnswer, handleWrongAnswer}) {

  const rightAnswer = 'Yes';
  const wrongAnswer = 'No';

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} >
      <figure className="tooltip__container">
      <p className="tooltip__answerCheck">Is it your answer?</p>
      <div className='tooltip__answerButtonWrapper'>
        <button className='button tooltip__answerButton' onClick={handleRightAnswer}>{rightAnswer}</button>
        <button className='button tooltip__answerButton' onClick={handleWrongAnswer}>{wrongAnswer}</button>
      </div>
      </figure>
    </section>
  )
}

export default TooltipRightWrong;
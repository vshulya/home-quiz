import React from 'react';
import './TooltipRightWrong.css';

function TooltipRightWrong({isOpen, handleAnswer}) {

  const rightAnswer = 'Yes';
  const wrongAnswer = 'No';

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} >
      <figure className="tooltip__container">
      <p className="tooltip__answerCheck">Is it your answer?</p>
      <div className='tooltip__answerButtonWrapper'>
        <button className='button tooltip__answerButton' onClick={() => {handleAnswer(true)}}>{rightAnswer}</button>
        <button className='button tooltip__answerButton' onClick={() => {handleAnswer(false)}}>{wrongAnswer}</button>
      </div>
      </figure>
    </section>
  )
}

export default TooltipRightWrong;
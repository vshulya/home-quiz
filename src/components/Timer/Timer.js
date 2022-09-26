import React from 'react';
import './Timer.css';

function Timer ({seconds, isTimeForAnswer}) {

    return (
      <div className='timer'>
        <div className='timer__time'>{seconds} sec</div>
        <div className={isTimeForAnswer ? 'timer__text_active' : ''}>
          <p className='timer__text'>It's time for your answer!</p>
        </div>
      </div>
  );
}

export default Timer;
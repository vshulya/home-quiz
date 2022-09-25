import React, { useEffect, useState } from 'react';
import './Timer.css';

function Timer ({seconds, isTimeForAnswer}) {

    return (
      <div className='timer'>
        <div className='timer__time'>{seconds} sec</div>
        <span className={isTimeForAnswer ? 'timer__text' : 'timer__text_hidden'}>It's time for your answer!</span>
      </div>
  );
}

export default Timer;
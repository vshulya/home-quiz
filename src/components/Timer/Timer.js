import React, { useEffect, useState } from 'react';
import './Timer.css';

function Timer ({seconds}) {

    return (
      <div className='timer'>
        <div className='timer__time'>{seconds} sec</div>
      </div>
  );
}

export default Timer;
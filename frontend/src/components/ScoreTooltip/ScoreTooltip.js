import React from 'react';
import './ScoreTooltip.css';
import Tooltip from '../Tooltip/Tooltip';

function ScoreTooltip({ isOpen, onClose, isPlayerSucceed }) {

  return (
    <Tooltip
      onClose={onClose}
      isOpen={isOpen}
      isPlayerSucceed={isPlayerSucceed}>
      <button onClick={onClose} type="button" className="popup__close"></button>
      <p className="tooltip__tip">{isPlayerSucceed ? "You won! Congratulations!" : "This time you lost. Try again."}</p>
    </Tooltip>
  )
}

export default ScoreTooltip;
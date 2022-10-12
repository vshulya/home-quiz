import React from 'react';
import './AnswerTooltip.css';
import Tooltip from '../Tooltip/Tooltip';

function ScoreTooltip({ isOpen, onClose, isPlayerAnswerRight }) {

  return (
    <Tooltip
      onClose={onClose}
      isOpen={isOpen}
      isPlayerAnswerRight={isPlayerAnswerRight}>
      <p className="tooltip__tip">{isPlayerAnswerRight ? "You got 1 point" : "Game got 1 point"}</p>
    </Tooltip>
  )
}

export default ScoreTooltip;
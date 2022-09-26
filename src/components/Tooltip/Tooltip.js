import React from 'react';
import './Tooltip.css';

function Tooltip({ isOpen, onClose, children }) {

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} >
      <figure className="tooltip__container">
        <button onClick={onClose} type="button" className="popup__close"></button>
        {children}
      </figure>
    </section>
  )
}

export default Tooltip;
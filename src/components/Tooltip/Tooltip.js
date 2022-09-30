import React from 'react';
import './Tooltip.css';

function Tooltip({ isOpen, children }) {

  return (
    <section className={`popup ${isOpen && "popup_opened"}`} >
      <figure className="tooltip__container">

        {children}
      </figure>
    </section>
  )
}

export default Tooltip;
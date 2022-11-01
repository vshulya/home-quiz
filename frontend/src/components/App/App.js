import React, { useEffect, useState } from 'react';
import Main from '../Main/Main';
import api from '../../utils/Api';

import './App.css';


function App() {

  const [allCards, setAllCards] = useState([]);

  //grab all cards from api
  const fetchCards = () => {
    api
      .getCards()
      .then((cards) => {
        setAllCards(allCards);
      })
      .catch(err => console.log(err));
  };

   //add a card
   const handleCardAdd = (card) => {
    api
      .addCard(card)
      .then((res) => {
        const updatedAllCards = [...allCards, { ...res, card }];
        setAllCards(updatedAllCards);
      })
      .catch(err => console.log(err));
  };


  //grab all cards when open a website
  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <div className="App">
      <div className='app__container'>
        <Main
          cards={allCards} 
          onCardAdd={handleCardAdd}/>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import './Navigation.css';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
//import SlidingPaneModal from '../SlidingPaneModal/SlidingPaneModal'

function Navigation({ shuffleQuestions, onCardAdd }) {

	const [isSlidingPaneOpen, setIsSlidingPaneOpen] = useState(false);

	const openSlidingPane = () => {
		setIsSlidingPaneOpen(true);
	}

	const closeSlidingPane = () => {
		setIsSlidingPaneOpen(false);
	}

	return (
		<div className="nav">
			<nav className="nav__menu">
				<button onClick={openSlidingPane} className="nav__button button"><span class="chevron"></span>About</button>
				<div className="nav__buttons">
					{/* <button className='button nav__button' onClick={onCardAdd}>Add the question</button> */}
					<button className='button nav__button' onClick={shuffleQuestions}>Next game</button>
				</div>
			</nav>
			<SlidingPane
				isOpen={isSlidingPaneOpen}
				onClick={openSlidingPane}
				onRequestClose={closeSlidingPane}
				from="bottom"
				width="100%"
				shouldCloseOnEsc
				hideHeader
			>
				<button onClick={closeSlidingPane} className="nav__button button"><span class="chevron  bottom"></span>About</button>
				<p className="slidingPane__description">This quiz is a fun and unique experience for a home party with your friends. </p>
				<p className="slidingPane__description">All questions do not assume that you know the answer like in most quizzes but invite you to think, analyze, discuss and come to the correct answer yourself.  </p>
				<p className="slidingPane__description">The game is simple. You play against the Game. Every round you open a new question. You have a minute to find an answer. </p>
				<p className="slidingPane__description">For every wrong answer, the game got a point. For every right answer, you got a point.</p>
				<p className="slidingPane__description">The winner - who got 5 points first.</p>
				<p className="slidingPane__description">Good luck! </p>
			</SlidingPane>
		</div>
	);
}

export default Navigation;
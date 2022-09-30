import React, { useState, useEffect } from "react";
import './Navigation.css';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
//import SlidingPaneModal from '../SlidingPaneModal/SlidingPaneModal'

function Navigation({shuffleQuestions}) {

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
						<button className='button nav__button' onClick={shuffleQuestions}>Next game</button>
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
						<p className="slidingPane__description">This quiz is a fun and unique experience for a home party with your friends. All questions do not assume that you know the answer like in most quizes, but invite you to think, analyze, discuss and come to the correct answer yourself.</p>
					</SlidingPane>
				</div>
	);
}

export default Navigation;
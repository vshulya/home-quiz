import React from "react";
import './SlidingPaneModal.css';

function SlidingPaneModal({ isOpen }) {

	const slidingPaneClassName = `slidingPane__menu ${isOpen ? 'slidingPane__menu_active' : null}`;

	return (
		<>
			<div className={slidingPaneClassName}>
				<div className='slidingPane__container'>
					<p className='slidingPane__description'>This quiz is a fun and unique experience for a home party with your friends. All questions do not assume that you know the answer like in most quizes, but invite you to think, analyze, discuss and come to the correct answer yourself.</p>
				</div>
			</div>
		</>
	);
}

export default SlidingPaneModal;
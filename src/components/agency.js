// @flow
import React from 'react';

const Agency = (props: { name: string, onAddTodoClick: () => void }) => {
	return (
		<div>
			<h1>{props.name}</h1>
			<p>
				This is an awesome agency
			</p>
			<a
				onClick={e => {
					e.preventDefault();
					props.onAddTodoClick();
				}}
			>
				Click on this link
			</a>
		</div>
	);
};

export default Agency;

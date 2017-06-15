// @flow
import React from 'react';
import './chip.css';

const Chip = (props: { icon: string }) => {
	return (
		<span className="chip">
			{props.icon}
		</span>
	);
};

export default Chip;

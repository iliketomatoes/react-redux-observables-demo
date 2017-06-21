// @flow
import React from 'react';
import { currencies } from '../currencies';
import type { Currency } from '../types';
import './chip.css';

const Chip = (props: { currency: Currency }) => {
	return (
		<span className="chip">
			{currencies[props.currency]}
		</span>
	);
};

export default Chip;

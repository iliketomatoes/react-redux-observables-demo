// @flow
import React from 'react';
import { currencySymbols } from '../currencies';
import type { Currency } from '../types';
import './chip.css';

const Chip = (props: { currency: Currency }) => {
	return (
		<span className="chip">
			{currencySymbols[props.currency]}
		</span>
	);
};

export default Chip;

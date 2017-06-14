// @flow
import React from 'react';
import type { Rates } from '../types';
import './currency.css';

const Currency = (props: {
	selected: string,
	symbol: string,
	rates: Rates
}) => {
	const options = props.rates.map(rate =>
		<option key={rate.id}>
			{rate.id}
			{rate.symbol}
		</option>
	);

	console.log(options);

	return (
		<div className="currency">
			<span className="currency__symbol mdl-color--teal mdl-color-text--white">
				{props.symbol}
			</span>
			<div className="currency__info">
				<div className="currency__desc">Current currency</div>
				<div className="currency__code">{props.selected}</div>
			</div>
		</div>
	);
};

export default Currency;

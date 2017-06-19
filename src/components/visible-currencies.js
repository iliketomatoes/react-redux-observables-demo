// @flow
import React from 'react';
import IconButton from 'material-ui/IconButton';
import { purpleA400, purpleA500} from 'material-ui/styles/colors';
import type { Rates } from '../types';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import './visible-currencies.css';

const VisibleCurrencies = (props: { rates: Rates }) => {
	const visibleRates = props.rates.filter(rate => rate.isVisible).length;

	return (
		<div className="visible-currencies">
			<div className="visible-currencies__label">
				Visible currencies
			</div>
			<div className="visible-currencies__amount">
				<span>{visibleRates}</span>
				<IconButton>
					<ActionSettings color={purpleA400} hoverColor={purpleA500} />
				</IconButton>
			</div>
		</div>
	);
};

export default VisibleCurrencies;

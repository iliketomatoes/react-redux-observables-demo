// @flow
import React from 'react';
import type { Rates } from '../types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from './chip';
import './currency.css';

class Currency extends React.Component {
	state: {
		selected: string,
		symbol: string
	};

	constructor(props: { selected: string, symbol: string, rates: Rates }) {
		super(props);

		this.state = {
			selected: props.selected,
			symbol: props.symbol
		};
	}

	render() {
		const items = this.props.rates.map(rate =>
			<MenuItem
				key={rate.id}
				value="{rate.id}"
				primaryText={`${rate.symbol} ${rate.id}`}
			/>
		);

		return (
			<div className="currency">
				<Chip icon={this.state.symbol} />
				<div className="currency__info">
					<SelectField
						value={this.state.selected}
						onChange={() => console.log('changeeeed')}
						maxHeight={200}
						floatingLabelText="Current currency"
						floatingLabelFixed={true}
					>
						<MenuItem
							key={this.state.selected}
							value={this.state.selected}
							primaryText={`${this.state.selected}`}
						/>
						{items}
					</SelectField>
				</div>
			</div>
		);
	}
}

export default Currency;

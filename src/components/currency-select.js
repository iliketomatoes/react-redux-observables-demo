// @flow
import React from 'react';
import type { Rates, Currency } from '../types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from './chip';
import { currencies } from '../currencies';
import './currency-select.css';

class CurrencySelect extends React.Component {

	state: { symbol: string } = {
		symbol: ''
	};

	constructor(props: { selected: string, symbol: string, rates: Rates, changeCurrency: (Currency) => void }) {
		super(props);

		this.state = {
			symbol: props.symbol
		};
	}

	onChangeSelect(curr: Currency) {
		this.props.changeCurrency(curr);
		this.setState({ symbol: currencies[curr] });
	}

	render() {
		const items = this.props.rates.map((rate, index) =>
			<MenuItem
				key={index + 1}
				value={rate.id}
				primaryText={`${currencies[rate.id]} ${rate.id}`}
			/>
		);

		return (
			<div className="currency">
				<Chip icon={this.state.symbol} />
				<div className="currency__info">
					<SelectField
						value={this.props.selected}
						onChange={(event: any, key: number, payload: Currency) => this.onChangeSelect(payload)}
						maxHeight={200}
						floatingLabelText="Current base"
						floatingLabelFixed={true}
					>
						<MenuItem
							key={0}
							value={this.props.selected}
							primaryText={`${this.props.selected}`}
						/>
						{items}
					</SelectField>
				</div>
			</div>
		);
	}
}

export default CurrencySelect;

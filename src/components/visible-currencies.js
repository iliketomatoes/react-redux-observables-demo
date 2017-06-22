// @flow
import React from 'react';
import IconButton from 'material-ui/IconButton';
import { purpleA400, purpleA500 } from 'material-ui/styles/colors';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { currencySymbols, humanReadableCurrencies } from '../currencies';
import './visible-currencies.css';
import type { Currency, Rates } from '../types';

const styles = {
	block: {
		maxWidth: 250
	},
	checkbox: {
		marginTop: 10,
		marginBottom: 10
	}
};

class VisibleCurrencies extends React.Component {
	state = {
		open: false
	};

	constructor(props: { rates: Rates, toggleVisibility: Rates => void }) {
		super(props);
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	toggleHandler(rateID: Currency) {
		const rate = this.props.rates.filter(r => r.id === rateID);
		this.props.toggleVisibility(rate);
	}

	render() {
		const actions = [
			<FlatButton
				label="Done"
				primary={true}
				onTouchTap={this.handleClose}
			/>
		];

		const checkboxes = this.props.rates.map((rate, i) => {
			return (
				<Checkbox
					key={i}
					checkedIcon={<Visibility />}
					uncheckedIcon={<VisibilityOff />}
					label={`${currencySymbols[rate.id]} ${humanReadableCurrencies[rate.id]}`}
					style={styles.checkbox}
					defaultChecked={rate.isVisible}
					onCheck={(ev, isChecked) => this.toggleHandler(rate.id)}
				/>
			);
		});

		const visibleRates = this.props.rates.filter(rate => rate.isVisible)
			.length;

		return (
			<div className="visible-currencies">
				<div className="visible-currencies__label">
					Visible currencies
				</div>
				<div className="visible-currencies__amount">
					<span>{visibleRates}</span>
					<IconButton onTouchTap={this.handleOpen}>
						<ActionSettings
							color={'#757575'}
							hoverColor={purpleA500}
						/>
					</IconButton>
				</div>
				<Dialog
					title="Visible currencies"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					autoScrollBodyContent={true}
				>
					{checkboxes}
				</Dialog>
			</div>
		);
	}
}

export default VisibleCurrencies;

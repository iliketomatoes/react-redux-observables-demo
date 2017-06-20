// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { currencies } from '../currencies';
import { initialState } from '../store';
import { getCurrentRates, fetchRates, setDate, toggleVisibility } from '../actions';
import Chart from '../components/chart';
import DateSelect from '../components/date-select';
import CurrencySelect from '../components/currency-select';
import VisibleCurrencies from '../components/visible-currencies';
import type { Currency, Rates, RateDate } from '../types';
import './home.css';

class Home extends React.Component {
	// Current currency unicode symbol
	unicodeCurrencySymbol: string;

	constructor(props: {
		history: any,
		match: any,
		location: any,
		currency: Currency,
		loadState: boolean,
		rates: Rates,
		rateDate: RateDate,
		latestDateAvailable: RateDate,
		toggleVisibility: Rates => void,
		loadCurrencyData: () => void,
		changeCurrency: Currency => void,
		setDate: RateDate => void
	}) {
		super(props);
		this.unicodeCurrencySymbol = currencies[props.currency];
	}

	componentDidMount() {
		this.props.loadCurrencyData();
	}

	render() {
		return (
			<div>
				<header className="mdl-grid">
					<h1 className="mdl-cell mdl-cell--12-col">
						Welcome to React prototype app
					</h1>
				</header>
				<div className="mdl-grid">
					<div className="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet">
						<CurrencySelect
							symbol={this.unicodeCurrencySymbol}
							selected={this.props.currency}
							rates={this.props.rates}
							changeCurrency={this.props.changeCurrency}
						/>
					</div>
					<div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-phone">
						<DateSelect
							currentDate={this.props.rateDate}
							maxDate={this.props.latestDateAvailable}
							onDateChange={this.props.setDate}
						/>
					</div>
					<div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-phone">
						<VisibleCurrencies toggleVisibility={this.props.toggleVisibility} rates={this.props.rates} />
					</div>
					<Chart
						rates={this.props.rates}
						curr={this.props.currency}
					/>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadCurrencyData: () => {
			dispatch(getCurrentRates());
		},
		changeCurrency: (curr: Currency) => {
			dispatch(fetchRates(curr));
		},
		setDate: (d: RateDate) => {
			dispatch(setDate(d));
		},
		toggleVisibility: (rates: Rates) => {
			dispatch(toggleVisibility(rates));
		}
	};
};

const mapStateToProps = (state: typeof initialState) => {
	return {
		currency: state.currency,
		loadState: state.loadState,
		rates: state.rates,
		rateDate: state.rateDate,
		latestDateAvailable: state.latestDateAvailable
	};
};

const connectedHome = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Home)
);

export default connectedHome;

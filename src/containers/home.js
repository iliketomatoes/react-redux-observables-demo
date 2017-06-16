// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { currencies } from '../currencies';
import { initialState } from '../store';
import { getCurrentRates, fetchRates } from '../actions';
import Rate from '../components/rate';
import CurrencySelect from '../components/currency-select';
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
		loadCurrencyData: () => void,
		changeCurrency: (Currency) => void
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
					<div className="mdl-cell mdl-cell--12-col">
						<CurrencySelect
							symbol={this.unicodeCurrencySymbol}
							selected={this.props.currency}
							rates={this.props.rates}
							changeCurrency={this.props.changeCurrency}
						/>
					</div>
					<div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
						<ul>
							{this.props.rates.map(rate =>
								<li key={rate.id}>
									<Rate
										curr={rate.id}
										val={rate.value}
										symbol={rate.symbol}
									/>
								</li>
							)}
						</ul>
					</div>
					<div className="mdl-cell mdl-cell--4-col mdl-cell--6-col-tablet">
						4 (6 tablet)
					</div>
					<div className="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone">
						2 (4 phone)
					</div>
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
		}
	};
};

const mapStateToProps = (state: typeof initialState) => {
	return {
		currency: state.currency,
		loadState: state.loadState,
		rates: state.rates,
		rateDate: state.rateDate
	};
};

const connectedHome = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Home)
);

export default connectedHome;

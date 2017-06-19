import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FETCH_RATES, GET_CURRENT_RATES, SET_DATE } from '../actions/types';
import { onRatesDataReceived, fetchRates } from '../actions';
import { currencies } from '../currencies';
import {
	isCurrencyVisible,
	getRateDateFromIsoString,
	getIsoStringFromRateDate
} from '../utils';
import type { Currency, Rates, Rate, RatesExtended } from '../types';

// epic
const fetchRateDataEpic = (action$, store) =>
	action$.ofType(FETCH_RATES).mergeMap(action => {
		const state = store.getState();

		// If the state is to its initial status, latest exchange rates gets fetched by default
		const date = state.rateDate.year === 0
			? 'latest'
			: getIsoStringFromRateDate(state.rateDate);

		return ajax
			.getJSON(`http://api.fixer.io/${date}?base=${action.payload}`)
			.map(response => {
				const date = getRateDateFromIsoString(response.date);

				// Get old rates to compare visibility property with
				const oldRates = store.getState().rates;

				const newRates: Rates = Object.entries(
					response.rates
				).map((rate: [Currency, number]) => {
					const currRate: Rate = {
						id: rate[0],
						value: rate[1],
						symbol: currencies[rate[0]],
						isVisible: isCurrencyVisible(rate[0], oldRates)
					};
					return currRate;
				});
				return onRatesDataReceived(
					({
						date: date,
						rates: newRates
					}: RatesExtended)
				);
			})
			.catch(err => {

				// TODO
				console.log(err);
				return Observable.of({ type: 'ERROR', payload: err});
			});
	});

const getRateDataFromStoreEpic = (action$, store) =>
	action$.ofType(GET_CURRENT_RATES).map(action => {
		const state = store.getState();

		if (state.rates.length > 0) {
			// If the store already has rates data, no further actiorn is required
			return { type: 'NO_OPERATION', payload: null };
		} else {
			// If the sore hasn't any rate data yet, it triggers the fetch rates action
			return fetchRates(state.currency);
		}
	});

const setDateEpic = (action$, store) =>
	action$.ofType(SET_DATE).map(action => {
		const state = store.getState();
		return fetchRates(state.currency);
	});

export const rootEpic = combineEpics(
	fetchRateDataEpic,
	getRateDataFromStoreEpic,
	setDateEpic
);

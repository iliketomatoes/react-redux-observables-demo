import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { FETCH_RATES, GET_CURRENT_RATES } from '../actions/types';
import { onRatesDataReceived, fetchRates } from '../actions';
import { currencies } from '../currencies';
import { isCurrencyVisible } from '../utils';
import type { Currency, Rates, Rate } from '../types';

// epic
const fetchRateDataEpic = (action$, store) =>
	action$.ofType(FETCH_RATES).mergeMap(action =>
		ajax
			.getJSON(`http://api.fixer.io/latest?base=${action.payload}`)
			.map(response => {
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
				return onRatesDataReceived(newRates);
			})
	);

const getRateDataFromStoreEpic = (action$, store) =>
	action$.ofType(GET_CURRENT_RATES).map(action => {
		const state = store.getState();
		if (state.rates.length > 0) {
			return { type: 'NO_OPERATION', payload: null };
		} else {
			return fetchRates(state.currency);
		}
	});

export const rootEpic = combineEpics(fetchRateDataEpic, getRateDataFromStoreEpic);

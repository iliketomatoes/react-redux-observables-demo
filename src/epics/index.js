import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { FETCH_RATES, GET_CURRENT_RATES, SET_DATE } from '../actions';
import { onRatesDataReceived, fetchRates, setInitialDate } from '../actions';
import { getRateDateFromIsoString, getIsoStringFromRateDate } from '../utils';
import type { Currency, Rates, Rate } from '../types';

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
			.mergeMap(
				(response: {
					base: Currency,
					date: string,
					rates: { [Currency]: number }
				}) => {

					// Turn raw rates object into an array
					const rates: Array<Rates> = Object.entries(response.rates)
						.map(rate => {
							return {id: rate[0], value: rate[1] }
						});

					if (state.rateDate.year === 0) {
						const date = getRateDateFromIsoString(response.date);

						return Observable.merge(
							Observable.of(onRatesDataReceived(rates)),
							Observable.of(setInitialDate(date))
						);
					} else {
						return Observable.of(onRatesDataReceived(rates));
					}
				}
			)
			.catch(err => {
				// TODO
				console.log(err);
				return Observable.of({ type: 'ERROR', payload: err });
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

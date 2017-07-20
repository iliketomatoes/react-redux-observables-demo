import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {
	FETCH_RATES,
	GET_CURRENT_RATES,
	SET_DATE,
	RESET,
	ERROR,
	ON_DATA_RECEIVED,
	ON_DATA_ROUNDED,
	TOGGLE_VISIBILITY
} from '../actions';
import {
	onRatesDataReceived,
	fetchRates,
	setInitialDate,
	setError,
	reset,
	computeStatistics
} from '../actions';
import { getRateDateFromIsoString, getIsoStringFromRateDate } from '../utils';
import type { Currency, Rates } from '../types';

// epic
const fetchRateDataEpic = (action$, store) =>
	action$.ofType(FETCH_RATES).mergeMap(action => {
		const state = store.getState();

		// If the state is to its initial status, latest exchange rates gets fetched by default
		const date = state.rateDate.year === 0
			? 'latest'
			: getIsoStringFromRateDate(state.rateDate);

		return ajax
			.getJSON(`https://api.fixer.io/${date}?base=${action.payload}`)
			.mergeMap(
				(response: {
					base: Currency,
					date: string,
					rates: { [Currency]: number }
				}) => {

					// Turn raw rates object into an array
					const rates: Array<Rates> = Object.entries(
						response.rates
					).map(rate => {
						const oldRate = state.rates.find(r => r.id === rate[0]);

						return {
							id: rate[0],
							value: rate[1],
							isVisible: oldRate ? oldRate.isVisible : true
						};
					});

					if (state.rateDate.year === 0) {
						const date = getRateDateFromIsoString(response.date);

						return Observable.merge(
							// This action will be processed by the statsWorker web worker
							Observable.of(onRatesDataReceived(rates)),
							Observable.of(setInitialDate(date))
						);
					} else {
						// This action will be processed by the statsWorker web worker
						return Observable.of(onRatesDataReceived(rates));
					}
				}
			)
			.catch(err => {
				console.log(err);
				return Observable.of(setError(err));
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

const computeStatisticsOnDataReceivedEpic = (action$, store) =>
	action$.ofType(ON_DATA_ROUNDED).map(action => {
		return computeStatistics(action.payload);
	});

const computeStatisticsOnToggleVisibilityEpic = (action$, store) =>
	action$.ofType(TOGGLE_VISIBILITY).map(action => {
		const targetRate = action.payload[0];

		const oldState = store.getState();
		const payload = oldState.rates.map(
			rate =>
				rate.id === targetRate.id
					? { ...rate, isVisible: !targetRate.isVisible }
					: rate
		);
		return computeStatistics(payload);
	});

const setDateEpic = (action$, store) =>
	action$.ofType(SET_DATE).map(action => {
		const state = store.getState();
		return fetchRates(state.currency);
	});

const triggerResetOnErrorDismissEpic = (action$, store) =>
	action$.ofType(ERROR).map(action => {
		if (action.payload.message === '' && action.payload.status === -1) {
			return reset();
		} else {
			return { type: 'NO_OPERATION', payload: null };
		}
	});

const resetEpic = (action$, store) =>
	action$.ofType(RESET).map(action => {
		const state = store.getState();
		return fetchRates(state.currency);
	});

export const rootEpic = combineEpics(
	fetchRateDataEpic,
	computeStatisticsOnDataReceivedEpic,
	computeStatisticsOnToggleVisibilityEpic,
	getRateDataFromStoreEpic,
	setDateEpic,
	triggerResetOnErrorDismissEpic,
	resetEpic
);

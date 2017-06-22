/* @flow */
import type { Currency, Rates, RateDate, Action, Error } from '../types';

/*
 * action types
 */
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
export const FETCH_RATES = 'FETCH_RATES';
export const ON_DATA_RECEIVED = 'ON_DATA_RECEIVED';
export const SET_DATE = 'SET_DATE';
export const SET_INITIAL_DATE = 'SET_INITIAL_DATE';
export const GET_CURRENT_RATES = 'GET_CURRENT_RATES';
export const ERROR = 'ERROR';
export const RESET = 'RESET';

/*
 * action creators
 */
export function fetchRates(curr: Currency): Action<Currency> {
	return { type: FETCH_RATES, payload: curr };
}

export function getCurrentRates(): Action<null> {
	return { type: GET_CURRENT_RATES, payload: null };
}

export function setDate(date: RateDate): Action<RateDate> {
	return { type: SET_DATE, payload: date };
}

export function setInitialDate(date: RateDate): Action<RateDate> {
	return { type: SET_INITIAL_DATE, payload: date };
}

export function toggleVisibility(rates: Rates): Action<Rates> {
	return { type: TOGGLE_VISIBILITY, payload: rates };
}

export function onRatesDataReceived(rates: Rates): Action<Rates> {
	return { type: ON_DATA_RECEIVED, payload: rates, meta: {
		WebWorker: true
	} };
}

export function setError(error: Error): Action<Error> {
	return { type: ERROR, payload: error }
}

// Action that follows an error, since it is complicated to handle different data set
export function reset(): Action<null> {
	return { type: RESET, payload: null }
};

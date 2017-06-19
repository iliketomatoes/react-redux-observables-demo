/* @flow */
import {
	SET_VISIBILITY_FILTER,
	FETCH_RATES,
	ON_DATA_RECEIVED,
	SET_DATE,
	GET_CURRENT_RATES,
	Action
} from './types';
import type { VisibilityFilter } from './types';
import type { Currency, Rates, RateDate, RatesRaw } from '../types';

/*
 * action creators
 */

export function setVisibilityFilter(
	filter: VisibilityFilter
): Action<VisibilityFilter> {
	return { type: SET_VISIBILITY_FILTER, payload: filter };
}

export function fetchRates(curr: Currency): Action<Currency> {
	return { type: FETCH_RATES, payload: curr };
}

export function getCurrentRates(): Action<null> {
	return { type: GET_CURRENT_RATES, payload: null };
}

export function setDate(date: RateDate): Action<RateDate> {
	return { type: SET_DATE, payload: date };
}

export function onRatesDataReceived(rates: RatesRaw): Action<RatesRaw> {
	return { type: ON_DATA_RECEIVED, payload: rates };
}

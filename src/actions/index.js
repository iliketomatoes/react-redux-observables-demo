/* @flow */
import {
	ADD_TODO,
	TOGGLE_TODO,
	SET_VISIBILITY_FILTER,
	GET_LATEST_RATES,
	ON_DATA_RECEIVED,
	SET_DATE,
	GET_CURRENT_RATES,
	Action
} from './types';
import type { VisibilityFilter } from './types';
import type { Currency, Rates, RateDate } from '../types';

/*
 * action creators
 */
export function addTodo(text: string): Action<string> {
	return { type: ADD_TODO, payload: text };
}

export function toggleTodo(index: number): Action<number> {
	return { type: TOGGLE_TODO, payload: index };
}

export function setVisibilityFilter(
	filter: VisibilityFilter
): Action<VisibilityFilter> {
	return { type: SET_VISIBILITY_FILTER, payload: filter };
}

export function getLatestRates(curr: Currency): Action<Currency> {
	return { type: GET_LATEST_RATES, payload: curr };
}

export function getCurrentRates(): Action<null> {
	return { type: GET_CURRENT_RATES, payload: null };
}

export function setDate(date: RateDate): Action<RateDate> {
	return { type: SET_DATE, payload: date };
}

export function onRatesDataReceived(rates: Rates): Action<Rates> {
	return { type: ON_DATA_RECEIVED, payload: rates };
}

// @flow
import { combineReducers } from 'redux';
import {
	TOGGLE_VISIBILITY,
	FETCH_RATES,
	GET_CURRENT_RATES,
	ON_DATA_RECEIVED,
	SET_INITIAL_DATE,
	SET_DATE,
	RESET,
	ERROR
} from '../actions';
import {
	initialRates,
	initialRateDate,
	initialLoadState,
	initialCurrency,
	initialError
} from '../store/initial-state';
import type { Currency, Rates, RateDate, Action, Error } from '../types';

export function loadState(
	state: boolean = initialLoadState,
	action: Action<any>
): boolean {
	switch (action.type) {
		case FETCH_RATES:
			return true;
		case ON_DATA_RECEIVED:
			return false;
		default:
			return state;
	}
}

export function currency(
	state: Currency = initialCurrency,
	action: Action<Currency>
): Currency {
	switch (action.type) {
		case RESET:
			return initialCurrency;
		case FETCH_RATES:
			return action.payload;
		default:
			return state;
	}
}

export function rates(
	state: Rates = initialRates,
	action: Action<Rates>
): Rates {
	switch (action.type) {
		case GET_CURRENT_RATES:
			return state;
		case ON_DATA_RECEIVED:
			const rates = action.payload.map(rate => {
				const oldRate = state.find(r => r.id === rate.id);
				return {
					...rate,
					isVisible: oldRate ? oldRate.isVisible : true
				};
			});
			return rates;
		case TOGGLE_VISIBILITY:
			const targetRate = action.payload[0];

			return state.map(
				rate =>
					rate.id === targetRate.id
						? { ...rate, isVisible: !targetRate.isVisible }
						: rate
			);
		default:
			return state;
	}
}

export function rateDate(
	state: RateDate = initialRateDate,
	action: Action<RateDate>
): RateDate {
	switch (action.type) {
		case RESET:
			return Object.assign({},initialRateDate);
		case SET_DATE:
		case SET_INITIAL_DATE:
			return action.payload;
		default:
			return state;
	}
}

export function latestDateAvailable(
	state: RateDate = initialRateDate,
	action: Action<RateDate>
): RateDate {
	switch (action.type) {
		case RESET:
			return Object.assign({},initialRateDate);
		case SET_INITIAL_DATE:
			return action.payload;
		default:
			return state;
	}
}

export function showHideError(
	state: Error = initialError,
	action: Action<Error>
): Error {
	switch (action.type) {
		case ERROR:
			return action.payload;
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	currency,
	loadState,
	rates,
	rateDate,
	latestDateAvailable,
	error: showHideError
});

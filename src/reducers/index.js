// @flow
import { combineReducers } from 'redux';
import {
	FETCH_RATES,
	GET_CURRENT_RATES,
	ON_DATA_RECEIVED,
	SET_DATE,
	Action
} from '../actions/types';
import { currencies } from '../currencies';
import { getRateDateFromIsoString, mergeRatesWithState } from '../utils';
import type { Currency, Rates, RateDate, RatesRaw, Rate } from '../types';

export const initialCurrency: Currency = 'EUR';
export const initialLoadState: boolean = false;
export const initialRates: Rates = [];
export const initialRateDate: RateDate = {
	year: 0,
	month: 0,
	day: 0
};

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
		case FETCH_RATES:
			return action.payload;
		default:
			return state;
	}
}

export function rates(
	state: Rates = initialRates,
	action: Action<RatesRaw>
): Rates {
	switch (action.type) {
		case GET_CURRENT_RATES:
			return state;
		case ON_DATA_RECEIVED:
			console.log(action);

			// Turn raw rates object into an array
			const rawRatesArr: Array<[Currency, any]> = Object.entries(action.payload.rates);

			return mergeRatesWithState(rawRatesArr, state);

		default:
			return state;
	}
}

export function rateDate(
	state: RateDate = initialRateDate,
	action: Action<RatesRaw>
): RateDate {
	switch (action.type) {
		case SET_DATE:
		case ON_DATA_RECEIVED:
			return getRateDateFromIsoString(action.payload.date);
		default:
			return state;
	}
}

export function latestDateAvailable(
	state: RateDate = initialRateDate,
	action: Action<RatesRaw>
): RateDate {
	switch (action.type) {
		case ON_DATA_RECEIVED:

			// On initial load, we get the latest available rate exchange date
			if (state.year === initialRateDate.year) {
				return getRateDateFromIsoString(action.payload.date);
			} else {
				return state;
			}
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	currency,
	loadState,
	rates,
	rateDate,
	latestDateAvailable
});

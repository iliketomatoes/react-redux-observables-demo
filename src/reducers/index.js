// @flow
import { combineReducers } from 'redux';
import {
	TOGGLE_VISIBILITY,
	FETCH_RATES,
	GET_CURRENT_RATES,
	ON_DATA_RECEIVED,
	SET_INITIAL_DATE,
	SET_DATE
} from '../actions';
import { initialRates, initialRateDate, initialLoadState, initialCurrency } from '../store/initial-state';
import { currencies } from '../currencies';
import { getRateDateFromIsoString } from '../utils';
import type { Currency, Rates, RateDate, Rate, Action } from '../types';

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
	action: Action<Rates>
): Rates {
	switch (action.type) {
		case GET_CURRENT_RATES:
			return state;
		case ON_DATA_RECEIVED:
			const rates = action.payload.map(rate => {
				const oldRate = state.find(r => r.id === rate.id);
				return {...rate, isVisible: oldRate? oldRate.isVisible : true};
			});
			return rates;
		case TOGGLE_VISIBILITY:
			// TODO
			/*return state.map(
				rate =>
					rate.id === action.payload.id
						? { ...rate, rate: action.payload.isVisible }
						: rate
			);*/

		default:
			return state;
	}
}

export function rateDate(
	state: RateDate = initialRateDate,
	action: Action<RateDate>
): RateDate {
	switch (action.type) {
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
		case SET_INITIAL_DATE:
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
	latestDateAvailable
});

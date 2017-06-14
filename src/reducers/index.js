// @flow
import { combineReducers } from 'redux';
import {
	ADD_TODO,
	TOGGLE_TODO,
	SET_VISIBILITY_FILTER,
	GET_LATEST_RATES,
	GET_CURRENT_RATES,
	ON_DATA_RECEIVED,
	SET_DATE,
	Action
} from '../actions/types';
import type { Currency, Rates, RateDate } from '../types';

export const initialCurrency: Currency = 'EUR';
export const initialLoadState: boolean = false;
export const initialRates: Rates = [];
export const initialRateDate: RateDate = {
	year: 0,
	month: 0,
	day: 0
};

function todos(state = [], action: Action<any>) {
	console.log(action);
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.payload,
					completed: false
				}
			];
		case TOGGLE_TODO:
			return state.map((todo, index) => {
				if (index === action.index) {
					return Object.assign({}, todo, {
						completed: !todo.completed
					});
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
}

export function visibilityFilter(
	state: string = 'SHOW_ALL',
	action: Action<any>
) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

export function loadState(
	state: boolean = initialLoadState,
	action: Action<any>
): boolean {
	switch (action.type) {
		case GET_LATEST_RATES:
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
		case GET_LATEST_RATES:
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
			// console.log(action.payload);
			return action.payload;
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
			return Object.assign({}, state);
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	currency,
	loadState,
	rates,
	rateDate
});

// @flow
import type { Currency, Rates, Rate } from './types';

export function isCurrencyVisible(curr: Currency, rates: Rates): boolean {
	const rate = getRateByCurrency(curr, rates);
	return rate ? rate.isVisible : true;
}

export function getRateByCurrency(curr: Currency, rates: Rates): Rate | null {
	const rate = rates.filter(currRate => {
		return currRate.id === curr;
	});
	return rate.length === 0 ? null : rate[0];
}

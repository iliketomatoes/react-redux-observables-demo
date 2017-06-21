import type { Currency, Rates, RateDate, Error } from '../types';

export const initialCurrency: Currency = 'EUR';
export const initialLoadState: boolean = false;
export const initialRates: Rates = [];
export const initialRateDate: RateDate = {
	year: 0,
	month: 0,
	day: 0
};
export const initialError: Error = {
	status: -1,
	message: ''
};

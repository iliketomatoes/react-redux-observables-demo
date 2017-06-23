import type { Currency, Rates, RateDate, Error, Statistics } from '../types';

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
export const initialStatistics: Statistics = {
	max: undefined,
	min: undefined,
	mean: 0,
	standardDeviation: 0
};

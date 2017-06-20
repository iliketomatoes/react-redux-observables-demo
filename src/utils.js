// @flow
import { currencies } from './currencies';
import type { Currency, Rates, Rate, RateDate } from './types';

export function getRateDateFromIsoString(isoDate: string): RateDate {
	const explodedDate = isoDate.split('-');

	return {
		year: parseInt(explodedDate[0], 10),
		month: parseInt(explodedDate[1], 10),
		day: parseInt(explodedDate[2], 10)
	};
}

export function getIsoStringFromRateDate(rateDate: RateDate): string {
	const year = rateDate.year;
	let month = rateDate.month.toString();
	let day = rateDate.day.toString();

	if (month.length < 2) month = '0'.concat(month);
	if (day.length < 2) day = '0'.concat(day);

	return year + '-' + month + '-' + day;
}

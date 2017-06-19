// @flow
import { currencies } from './currencies';
import type { Currency, Rates, Rate, RateDate } from './types';

export function mergeRatesWithState(r: Array<[Currency, number]>, oldState: Rates): Rates {

	const newRates = r.map((rate) => {

		const id = rate[0];
		const value = rate[1];

		const oldElement = oldState.find(oldRate => oldRate ===  id);

		const currRate: Rate = {
			id,
			value,
			symbol: currencies[id],
			isVisible: oldElement? oldElement.isVisible : true
		};
		return currRate;
	});

	return newRates;
}

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

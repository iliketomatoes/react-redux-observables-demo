// @flow
import { currencies } from './currencies';

export type Currency = $Keys<typeof currencies>;

export type Rates = Array<Rate>;

export type Rate = {
	id: Currency,
	symbol: string,
	value: number,
	isVisible: boolean
};

export type RateDate = {
	year: number,
	month: number,
	day: number,
};

export type RatesRaw = {
	base: Currency,
	date: string,
	rates: { [Currency]: number  }
};

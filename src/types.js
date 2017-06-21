// @flow
import { currencies } from './currencies';

export type Currency = $Keys<typeof currencies>;

export type Rates = Array<Rate>;

export type Rate = {
	id: Currency,
	value: number,
	isVisible?: boolean
};

export type RateDate = {
	year: number,
	month: number,
	day: number,
};

export type Error = {
	message: string,
	status: number
};

/*
 * Interface to be used for any Action
 */
export interface Action<T> {
    type: string;
	payload: T;
};

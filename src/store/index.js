// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createWorkerMiddleware from 'redux-worker-middleware';
import { rootReducer } from '../reducers';
import { rootEpic } from '../epics';
import {
	initialRates,
	initialCurrency,
	initialRateDate,
	initialLoadState,
	initialError
} from './initial-state';
import type { Currency, Rates, RateDate, Error } from '../types';

// Hot module reloading
if (module.hot) {
  module.hot.accept('../epics', () => {
    const rootEpic = require('../epics').default;
    epicMiddleware.replaceEpic(rootEpic);
  });
}

export const initialState: {
	currency: Currency,
	loadState: boolean,
	rates: Rates,
	rateDate: RateDate,
	latestDateAvailable: RateDate,
	error: Error
} = {
	currency: initialCurrency,
	loadState: initialLoadState,
	rates: initialRates,
	rateDate: initialRateDate,
	latestDateAvailable: initialRateDate,
	error: initialError
};

const rCERWorker = new Worker('/workers/roundCurrencyExchangeRateWorker.js');

const workerMiddleware = createWorkerMiddleware(rCERWorker);

// Connect the middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// Store factory function
export default function configureStore() {
  const store = createStore(
    rootReducer,
	initialState,
    applyMiddleware(workerMiddleware, epicMiddleware)
  );

  return store;
}

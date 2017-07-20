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
	initialError,
	initialStatistics
} from './initial-state';
import type { Currency, Rates, RateDate, Error, Statistics } from '../types';

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
	error: Error,
	statistics: Statistics
} = {
	currency: initialCurrency,
	loadState: initialLoadState,
	rates: initialRates,
	rateDate: initialRateDate,
	latestDateAvailable: initialRateDate,
	error: initialError,
	statistics: initialStatistics
};


const statsWorker = new Worker('workers/statsWorker.js');
const workerMiddleware = createWorkerMiddleware(statsWorker);

// Connect the middleware
const epicMiddleware = createEpicMiddleware(rootEpic);

// Store factory function
export default function configureStore() {
  const store = createStore(
    rootReducer,
	initialState,
    applyMiddleware(epicMiddleware, workerMiddleware)
  );

  return store;
}

// @flow
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from '../reducers';
import { rootEpic } from '../epics';
import {
	initialRates,
	initialCurrency,
	initialRateDate,
	initialLoadState
} from './initial-state';
import type { Currency, Rates, RateDate } from '../types';

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
	latestDateAvailable: RateDate
} = {
	currency: initialCurrency,
	loadState: initialLoadState,
	rates: initialRates,
	rateDate: initialRateDate,
	latestDateAvailable: initialRateDate
};

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  const store = createStore(
    rootReducer,
	initialState,
    applyMiddleware(epicMiddleware)
  );

  return store;
}

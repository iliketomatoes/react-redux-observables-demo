/* @flow */
import { createStore } from 'redux';
import { rootReducer } from '../reducers';
import type { Store } from './types';

export const initialState: Store = {
	visibilityFilter: 'SHOW_ALL',
	todos: []
};

export const store = createStore(rootReducer, initialState);

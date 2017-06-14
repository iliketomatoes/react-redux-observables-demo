/* @flow */

/*
 * action types
 */
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const GET_LATEST_RATES = 'GET_LATEST_RATES';
export const ON_DATA_RECEIVED = 'ON_DATA_RECEIVED';
export const SET_DATE = 'SET_DATE';
export const GET_CURRENT_RATES = 'GET_CURRENT_RATES';

/*
 * Interface to be used for any Action
 */
export interface Action<T> {
    type: string;
	payload: T;
};

export type VisibilityFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';

/* @flow */
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, Action } from './types';
import type { VisibilityFilter } from './types';

/*
 * action creators
 */
export function addTodo(text: string): Action<string> {
	return { type: ADD_TODO, payload: text };
}

export function toggleTodo(index: number): Action<number> {
	return { type: TOGGLE_TODO, payload: index };
}

export function setVisibilityFilter(
	filter: VisibilityFilter
): Action<VisibilityFilter> {
	return { type: SET_VISIBILITY_FILTER, payload: filter };
}

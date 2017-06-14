// @flow
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from '../actions/types';
import { combineReducers } from 'redux';

function todos(state = [], action) {
	console.log(action);
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.payload,
					completed: false
				}
			];
		case TOGGLE_TODO:
			return state.map((todo, index) => {
				if (index === action.index) {
					return Object.assign({}, todo, {
						completed: !todo.completed
					});
				} else {
					return todo;
				}
			});
		default:
			return state;
	}
}

export function visibilityFilter(state: string = 'SHOW_ALL', action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			return action.filter;
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	visibilityFilter,
	todos
});

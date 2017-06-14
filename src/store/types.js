import type { VisibilityFilter } from '../actions/types';

export interface Store = {
	visibilityFilter: VisibilityFilter;
	todos: Array<any>;
}

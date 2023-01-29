export const js_non_entry = {
	meta: {
		api: () => import('./+js_non_entry'),
	},
};

export function load() {
	return 'js_non_entry_load';
}

export const actions = {
	default() {
		return 'js_non_entry_actions';
	},
};

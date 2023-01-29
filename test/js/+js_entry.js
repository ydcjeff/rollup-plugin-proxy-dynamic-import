export const js_entry = {
	meta: {
		api: () => import('./+js_entry'),
	},
};

export function load() {
	return 'js_entry_load';
}

export const actions = {
	default() {
		return 'js_entry_actions';
	},
};

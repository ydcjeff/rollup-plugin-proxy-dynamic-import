export const js_non_entry = {
	meta: {
		api: () => import('./+js'),
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

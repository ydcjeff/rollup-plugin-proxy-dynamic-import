export const js_ext_entry = {
	meta: {
		api: () => import('./+js_ext_entry.js'),
	},
};

export function load() {
	return 'js_ext_entry_load';
}

export const actions = {
	default() {
		return 'js_ext_entry_actions';
	},
};

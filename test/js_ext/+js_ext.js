export const js_ext_non_entry = {
	meta: {
		api: () => import('./+js_ext.js'),
	},
};

export function load() {
	return 'js_ext_non_entry_load';
}

export const actions = {
	default() {
		return 'js_ext_non_entry_actions';
	},
};

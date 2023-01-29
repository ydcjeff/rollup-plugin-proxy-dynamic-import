export const ts_entry = {
	meta: {
		api: () => import('./+ts_entry'),
	},
};

export function load() {
	return 'ts_entry_load';
}

export const actions = {
	default() {
		return 'ts_entry_actions';
	},
};

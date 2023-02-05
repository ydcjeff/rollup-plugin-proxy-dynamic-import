export const ts_non_entry = {
	meta: {
		api: () => import('./+ts'),
	},
};

export function load() {
	return 'ts_non_entry_load';
}

export const actions = {
	default() {
		return 'ts_non_entry_actions';
	},
};

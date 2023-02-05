export const page = {
	meta: {
		api: () => import('./+page_1'),
	},
};

export function load() {
	return 'page_1_load';
}

export const actions = {
	default() {
		return 'page_1_actions';
	},
};

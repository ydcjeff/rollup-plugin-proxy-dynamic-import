export const page = {
	meta: {
		api: () => import('./+page_2'),
	},
};

export function load() {
	return 'page_2_load';
}

export const actions = {
	default() {
		return 'page_2_actions';
	},
};

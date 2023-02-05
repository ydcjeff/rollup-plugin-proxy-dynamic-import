const pages = import.meta.glob('./pages/*.js', { eager: true, import: 'page' });

export const glob = {
	pages: /** @__PURE__ */ Object.values(pages),
	meta: {
		api: () => import('./+glob'),
	},
};

export function load() {
	return 'glob_non_entry_load';
}

export const actions = {
	default() {
		return 'glob_non_entry_actions';
	},
};

export const partial_export = {
	meta: {
		api: () => import('./+partial_exports.js'),
	},
};

export function load() {
	return 'partial export';
}

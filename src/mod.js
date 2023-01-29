import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import { addExtension, createFilter } from '@rollup/pluginutils';

const PREFIX = '?pdi_';
const FACADE_QUERY = PREFIX + 'facade';
const STATIC_QUERY = PREFIX + 'static';
const DEFAULT_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.mjs'];

/**
 *
 * @param {import('./index').ProxyDynamicImportOptions} opts
 * @returns {import('vite').Plugin}
 */
export function proxy_dynamic_import(opts) {
	const name = 'proxy-dynamic-import';
	const { include, exclude, reexports } = opts;
	if (!include) {
		throw new Error(
			`[plugin:${name}] "include" option is required not to over-resolve every files.`,
		);
	}

	let { extensions } = opts;
	const filter = createFilter(include, exclude);

	return {
		name,
		apply: 'build',

		configResolved({ resolve }) {
			extensions = resolve.extensions;
		},

		options() {
			if (!extensions) {
				extensions = DEFAULT_EXTENSIONS;
			}
		},

		resolveId: {
			order: 'pre',
			handler(source, importer, { isEntry }) {
				if (importer?.endsWith(FACADE_QUERY)) {
					return importer.replace(FACADE_QUERY, '');
				}

				const file = lets_resolve(source, filter, importer, extensions);
				if (file) {
					// Rollup by default creates a separate chunk when the source is
					// statically imported somewhere and given as an entry in the `input` option
					// However, we only want to bundle the statically imported bindings, and
					// create separate chunks for dynamic imported sources / entries, and
					// possibly treeshake dynamic imports by re-exporting in facade modules.
					return (
						file + (isEntry && reexports?.length ? FACADE_QUERY : STATIC_QUERY)
					);
				}
			},
		},

		// this is required for non-entry dynamic imports
		resolveDynamicImport(source, importer) {
			const file = lets_resolve(source, filter, importer, extensions);
			if (file && reexports?.length) {
				return file + FACADE_QUERY;
			}
		},

		async load(id) {
			if (id.endsWith(STATIC_QUERY)) {
				return await fsp.readFile(id.replace(STATIC_QUERY, ''), 'utf-8');
			}

			if (reexports?.length && id.endsWith(FACADE_QUERY)) {
				const mod = JSON.stringify(id.replace(FACADE_QUERY, ''));
				if (reexports === '*') {
					return `export * from ${mod};`;
				} else {
					return `export { ${reexports.join(',')} } from ${mod};`;
				}
			}
		},
	};
}

/**
 * @param {string | import('rollup').AcornNode} source
 * @param {(id: unknown) => boolean} filter
 * @param {string} [importer]
 * @param {string[]} [extensions]
 */
function lets_resolve(source, filter, importer, extensions) {
	if (typeof source === 'string' && filter(source) && extensions?.length) {
		const dir = importer ? path.dirname(importer) : process.cwd();
		const file_ext = path.extname(source);

		if (extensions.includes(file_ext)) {
			const file = path.resolve(dir, source);
			if (fs.existsSync(file)) {
				return file;
			}
		} else {
			for (const ext of extensions) {
				if (ext !== '.json') {
					const file = path.resolve(dir, addExtension(source, ext));
					if (fs.existsSync(file)) {
						return file;
					}
				}
			}
		}
	}
}

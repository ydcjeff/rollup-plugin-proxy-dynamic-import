import { createFilter, FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'vite';

export interface ProxyDynamicImportOptions {
	/**
	 * `include` argument of {@link createFilter}.
	 */
	include: FilterPattern;
	/**
	 * `exclude` argument of {@link createFilter}.
	 */
	exclude?: FilterPattern;
	/**
	 * Export names to re-export. Use `*` to re-export all, not that it does not
	 * re-export `default` export.
	 */
	reexports?: string[] | '*';
	/**
	 * List of file extensions to resolve for imports that omit extensions.
	 *
	 * When used as a Vite plugin, it takes `resolve.extensions` instead of given
	 * value without `.json`.
	 *
	 * When used as a Rollup plugin, its default is
	 * `['.js'. '.ts', '.jsx', '.tsx', '.mjs']`.
	 */
	extensions?: string[];
}

export function proxy_dynamic_import(opts: ProxyDynamicImportOptions): Plugin;

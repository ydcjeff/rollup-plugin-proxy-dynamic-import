import tg from 'tiny-glob/sync.js';
import * as path from 'node:path';

const root = process.cwd();
const files = tg('./**/+*_entry.*', { filesOnly: true, absolute: false });

/** @type {import('rollup').InputOption} */
export const input = {
	app: 'app.js',
};

for (const file of files) {
	input[path.relative(root, file.replace(/\.[jt]s$/, ''))] = file;
}

/** @type {import('rollup').OutputOptions} */
export const output = {
	entryFileNames: '[name].js',
	chunkFileNames: 'c/[name].js',
};

/** @type {import('../src/index').ProxyDynamicImportOptions} */
export const pdi_options = {
	include: /\+\w+(?:\.[jt]s)?$/,
	reexports: ['load', 'actions'],
};

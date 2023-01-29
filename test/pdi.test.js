import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, test } from 'vitest';

const ROLLUP_DIST = 'dist/rollup';
const VITE_DIST = 'dist/vite';

/**
 * @param {string} dir
 * @param {string} file
 */
function read(dir, file) {
	return fs.readFileSync(path.resolve(dir, file), 'utf-8');
}

/**
 * @param {string} file
 */
function rollup_read(file) {
	return read(ROLLUP_DIST, file);
}

/**
 * @param {string} file
 */
function vite_read(file) {
	return read(VITE_DIST, file);
}

/**
 * @param {string} name
 * @param {boolean} is_rollup
 * @param {string} file
 */
function run_test(name, is_rollup, file) {
	test(name, () => {
		file = path.join(name, file);
		const content = is_rollup ? rollup_read(file) : vite_read(file);
		expect(content).toMatchSnapshot();
	});
}

/**
 * @param {boolean} is_rollup
 */
function run_all_tests(is_rollup) {
	const file_map = {
		js: ['_js_entry.js', '_js_non_entry.js'],
		js_ext: ['_js_ext_entry.js', '_js_ext_non_entry.js'],
		ts: ['_ts_entry.js', '_ts_non_entry.js'],
	};

	for (const [dir, files] of Object.entries(file_map)) {
		describe(dir, () => {
			for (const file of files) {
				run_test(dir, is_rollup, file);
			}
		});
	}
}

describe('rollup', () => {
	run_all_tests(true);
});

describe('vite', () => {
	run_all_tests(false);
});

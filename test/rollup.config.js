import * as fs from 'node:fs';
import { proxy_dynamic_import } from '../src/mod.js';
import { input, output, pdi_options } from './common.config.js';
import { defineConfig } from 'rollup';

fs.rmSync('./dist/rollup', { force: true, recursive: true });

export default defineConfig({
	input,
	output: {
		dir: 'dist/rollup',
		...output,
	},
	plugins: [proxy_dynamic_import(pdi_options)],
});

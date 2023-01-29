import { proxy_dynamic_import } from '../src/mod.js';
import { input, output, pdi_options } from './common.config.js';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [proxy_dynamic_import(pdi_options)],
	build: {
		modulePreload: false,
		outDir: 'dist/vite',
		rollupOptions: {
			input,
			output,
		},
	},
});

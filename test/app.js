/// <reference types="vite/client" />

import { js_non_entry } from './js/+js';
import { js_entry } from './js/+js_entry';
import { js_ext_non_entry } from './js_ext/+js_ext';
import { js_ext_entry } from './js_ext/+js_ext_entry';
import { ts_non_entry } from './ts/+ts';
import { ts_entry } from './ts/+ts_entry';

const globs = import.meta.glob('./import_meta_glob/*.js', {
	eager: true,
	import: 'glob',
});

// eslint-disable-next-line no-console
console.log({
	globs,
	js_entry,
	js_ext_entry,
	js_ext_non_entry,
	js_non_entry,
	ts_entry,
	ts_non_entry,
});

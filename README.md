# rollup-plugin-proxy-dynamic-import

<a href="https://www.npmjs.com/package/rollup-plugin-proxy-dynamic-import" target="_blank" rel="noopener">
<img alt="npm" src="https://img.shields.io/npm/v/rollup-plugin-proxy-dynamic-import">
</a>

> Bundle static imported bindings from modules which will be dynamically
> imported somewhere, and treeshake those static imported bindings from the
> dynamic imported modules

```sh
pnpm add rollup-plugin-proxy-dynamic-import -D
```

## Motivation

In the past, before file system based routing, we configure the routes in the
giant route file. Later, there has been many improvements / ideas in the modern
web development, namely file based routing, and then Remix Route Module, and now
SvelteKit and Next.js directory based routing.

Personally, I prefer config based routing to FS based one, but I am not eager to
define every route in a giant route file. At the same time, I track SvelteKit
development, and saw their directory based routing proposal. It gives you the
structure for co-locating data loading code, view code, and the rest. Since
SvelteKit routing is FS based, they don't need another file for routing. But for
config based routing, what is the best place to define routing? In `+routing.js`
(taken from Angular naming convention) ?

If possible, I would like to define them in `+page.js` and `+layout.js` and
import them in router file with Vite's `import.meta.glob`. That way, the app
will still work even if you delete one route. However, in JavaScript, when you
import a module, you get a module even without using every exports (which hurt
the purpose of using dynamic import for lazy loading).

What if we could separate the static imported bindings into another module and
the rest in the original module at build time? This way, we could still be able
to import static bindings and get the benefit of lazy loading. This plugin does
that for you. Without further ado, let's use it.

## Usage

This plugin works in both Rollup and Vite setup.

```js
// rollup.config.js / vite.config.js
import { proxy_dynamic_import } from 'rollup-plugin-proxy-dynamic-import';

export default {
	plugins: [proxy_dynamic_import(opts)],
};
```

### `ProxyDynamicImportOptions`

```ts
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
	 * This option is required to be defined to treeshake only used exports in
	 * dynamic imports. This plugin creates facade modules to re-export used bindings
	 * so that Rollup can treeshake ununsed ones. This is a workaround until Rollup
	 * can treeshake dynamic imports OOTB.
	 *
	 * https://github.com/rollup/rollup/issues/3447
	 *
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
```

## Contributing

Use `snake_case` everywhere, the rest is handled by Prettier.

- Install deps:

  ```
  pnpm i
  ```

- Format Code

  ```
  pnpm fmt
  ```

- Lint

  ```
  pnpm lint
  ```

- Typecheck

  ```
  pnpm tsc
  ```

- Test

  ```
  pnpm run test
  ```

## Changelog

[CHANGELOG.md](https://github.com/ydcjeff/rollup-plugin-proxy-dynamic-import/blob/main/CHANGELOG.md)

## License

[MIT](./LICENSE)

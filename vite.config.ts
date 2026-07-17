import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Deploy na VPS: samodzielny serwer Node pod PM2 (build/index.js), nginx jako proxy.
			// Netlify (serverless) odpadło, bo nie utrzymuje wgranych zdjęć — dysk jest ulotny,
			// a panel zapisuje pliki na dysk (patrz $lib/server/uploads.ts).
			adapter: adapter()
		})
	]
});

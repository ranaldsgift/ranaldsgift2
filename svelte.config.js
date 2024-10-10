import azure from 'svelte-adapter-azure-swa';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: azure({
			customStaticWebAppConfig: {
				globalHeaders: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
				}
			}
		})
	},

	vitePlugin: {
		inspector: true
	}
};

export default config;
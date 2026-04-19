import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const localizedEntries = [
	'/',
	'/en',
	'/tr',
	'/sobre',
	'/contato',
	'/localizacoes',
	'/menu',
	'/crawl-path',
	'/en/about',
	'/en/contact',
	'/en/locations',
	'/en/menu',
	'/en/crawl-path',
	'/tr/hakkimizda',
	'/tr/iletisim',
	'/tr/konumlar',
	'/tr/menu',
	'/tr/crawl-path'
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: [...localizedEntries, '/sitemap.xml', '/robots.txt']
		}
	}
};

export default config;

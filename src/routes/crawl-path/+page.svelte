<script>
	import { page } from '$app/state';
	import { localizeHref, locales } from '$lib/paraglide/runtime';
	import Seo from '$lib/components/Seo.svelte';

	const canonical = $derived(`${page.url.origin}${page.url.pathname}`.replace(/\/$/, ''));

	const pages = [
		{ path: '/', label: 'Home' },
		{ path: '/menu', label: 'Menu' },
		{ path: '/about', label: 'About' },
		{ path: '/locations', label: 'Locations' },
		{ path: '/contact', label: 'Contact' }
	];
</script>

<Seo
	title="Crawl Path | Istanbul Restaurant"
	description="HTML crawl path for all public pages and language variants of Istanbul Restaurant."
	keywords="crawl path, html sitemap, internal links"
	url={canonical}
	siteName="Istanbul Restaurant"
/>

<section class="min-h-[50vh] bg-white px-6 py-24 text-gray-800" itemscope itemtype="https://schema.org/CollectionPage">
	<div class="container mx-auto max-w-4xl">
		<h1 class="mb-3 font-serif text-4xl" itemprop="name">Crawl Path</h1>
		<p class="mb-10 text-gray-600" itemprop="description">
			Direct links to all public sections and language variants.
		</p>

		<div class="grid gap-8 md:grid-cols-2">
			<div>
				<h2 class="mb-4 text-sm font-bold uppercase tracking-widest text-gray-500">Main pages</h2>
				<ul class="space-y-2">
					{#each pages as entry}
						<li>
							<a class="text-primary hover:underline" href={localizeHref(entry.path)}>{entry.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h2 class="mb-4 text-sm font-bold uppercase tracking-widest text-gray-500">Language variants</h2>
				<ul class="space-y-3">
					{#each pages as entry}
						<li>
							<div class="text-sm font-medium text-gray-900">{entry.label}</div>
							<div class="mt-1 flex flex-wrap gap-3 text-sm">
								{#each locales as locale}
									<a class="text-primary hover:underline" href={localizeHref(entry.path, { locale })}>
										{locale.toUpperCase()}
									</a>
								{/each}
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-600">
			<a class="text-primary hover:underline" href="/sitemap.xml">XML sitemap</a>
		</div>
	</div>
</section>

<script>
	import { MapPin, Moon } from '@lucide/svelte';
	// import HeaderSimple from '$lib/components/HeaderSimple.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import location_msc from '$lib/assets/images/location-msc.jpeg?enhanced';
	import location_bm from '$lib/assets/images/section1-1.jpeg?enhanced';
	import * as m from '$lib/paraglide/messages';
	import { page } from '$app/state';
	import Seo from '$lib/components/Seo.svelte';

	const seoTitle = m.locations_seo_title();
	const seoDescription = m.locations_seo_description();
	const seoKeywords = m.locations_seo_keywords();
	const canonical = $derived(() => `${page.url.origin}${page.url.pathname}`.replace(/\/$/, ''));
</script>

<Seo 
	title={seoTitle} 
	description={seoDescription} 
	keywords={seoKeywords}
	url={canonical}
	siteName="Istanbul Restaurant"
/>

<!-- <HeaderSimple forceSolid /> -->

<div class="min-h-[60vh] bg-white py-20" itemscope itemtype="https://schema.org/Place">
	<div class="container mx-auto px-6">
		<div class="mb-16 text-center">
			<h1 class="mb-4 font-serif text-4xl" itemprop="name">{m.locations_title()}</h1>
			<p class="mx-auto max-w-2xl text-gray-600" itemprop="description">
				{m.locations_intro()}
			</p>
			<div
				class="mt-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-1 text-sm font-medium text-green-700"
			>
				<Moon size={14} />
				<span>{m.locations_badge_halal()}</span>
			</div>
		</div>

		<div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
			<!-- Location 1 -->
			<div class="rounded-lg border border-gray-200 bg-white overflow-hidden" itemprop="containsPlace" itemscope itemtype="https://schema.org/Restaurant">
				<div class="group h-64 overflow-hidden">
					<enhanced:img
						src={location_msc}
						alt="Maputo Shopping Center"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						itemprop="image"
					/>
				</div>
				<div class="p-8">
					<h3 class="mb-2 font-serif text-2xl" itemprop="name">Maputo Shopping Center / Istanbul Restaurant</h3>
					<div class="mb-6 flex items-start gap-3 text-gray-600" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
						<MapPin class="mt-1 shrink-0 text-primary" size={18} />
						<p><span itemprop="streetAddress">Rua Ngungunhane, 85, Loja G 25 R/C</span><br /><span itemprop="addressLocality">Maputo</span></p>
					</div>
					<a
						href="https://maps.google.com/?q=Maputo+Shopping+Center"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-900 transition-all hover:border-primary hover:bg-primary/5"
						itemprop="hasMap"
					>
						{m.locations_get_directions()}
					</a>
				</div>
			</div>

			<!-- Location 2 -->
			<div class="rounded-lg border border-gray-200 bg-white overflow-hidden" itemprop="containsPlace" itemscope itemtype="https://schema.org/Restaurant">
				<div class="group h-64 overflow-hidden">
					<enhanced:img
						src={location_bm}
						alt="Baía-Mall"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						itemprop="image"
					/>
				</div>
				<div class="p-8">
					<h3 class="mb-2 font-serif text-2xl" itemprop="name">Baía-Mall Istanbul Restaurant</h3>
					<div class="mb-6 flex items-start gap-3 text-gray-600" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
						<MapPin class="mt-1 shrink-0 text-primary" size={18} />
						<p><span itemprop="streetAddress">Baía Mall Shopping Center</span><br /><span itemprop="addressLocality">Maputo</span><br /><span itemprop="addressCountry">Mozambique</span></p>
					</div>
					<a
						href="https://maps.google.com/?q=Baia+Mall+Maputo"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-900 transition-all hover:border-primary hover:bg-primary/5"
						itemprop="hasMap"
					>
						{m.locations_get_directions()}
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- <Footer /> -->

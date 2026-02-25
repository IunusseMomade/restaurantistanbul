<script>
	import Footer from '$lib/components/Footer.svelte';
	// import Footer from '$lib/components/Footer.svelte';

	import Gallery from '$lib/components/Gallery.svelte';
	import HomeHero from '$lib/components/HomeHero.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import PromoBanner from '$lib/components/PromoBanner.svelte';
	import RelatedVenues from '$lib/components/RelatedVenues.svelte';
	import InfoBar from '$lib/components/InfoBar.svelte';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import ogImageAssetUrl from '$lib/assets/og-image.jpeg';
	import Seo from '$lib/components/Seo.svelte';

	const seoTitle = m.home_seo_title();
	const seoDescription = m.home_seo_description();
	const seoKeywords = m.home_seo_keywords();

	const canonical = $derived(`${page.url.origin}${page.url.pathname}`.replace(/\/$/, ''));

	const ogImage = $derived(new URL(ogImageAssetUrl, page.url.origin).toString());

	const jsonLd = $derived({
		"@context": "https://schema.org",
		"@type": "Restaurant",
		"name": "Istanbul Restaurant",
		"image": ogImage,
		"description": seoDescription,
		"telephone": "+258847131300",
		"url": "https://restaurantistanbul.pages.dev",
		"areaServed": [
			{
				"@type": "City",
				"name": "Maputo"
			},
			{
				"@type": "City",
				"name": "Matola"
			},
			{
				"@type": "Country",
				"name": "Mozambique"
			}
		],
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Maputo",
			"addressCountry": "MZ"
		},
		"servesCuisine": ["Turkish", "Mediterranean", "Halal", "Steakhouse"],
		"priceRange": "$$",
		"hasMenu": "https://restaurantistanbul.pages.dev/menu",
		"openingHoursSpecification": [
			{
			"@type": "OpeningHoursSpecification",
			"dayOfWeek": [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday"
			],
			"opens": "07:00",
			"closes": "23:00"
			}
		],
		"hasPOS": [
			{
			"@type": "FoodEstablishment",
			"name": "Istanbul Restaurant — Maputo Shopping Center",
			"telephone": "+258847131300",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "Maputo Shopping Center",
				"addressLocality": "Maputo",
				"addressCountry": "MZ"
			}
			},
			{
			"@type": "FoodEstablishment",
			"name": "Istanbul Restaurant — Baía-Mall",
			"telephone": "+258847131300",
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "Baía-Mall",
				"addressLocality": "Maputo",
				"addressCountry": "MZ"
				}
			}
			]
		});
</script>

<Seo 
	title={seoTitle} 
	description={seoDescription} 
	keywords={seoKeywords}
	image={ogImage}
	url={canonical}
	siteName="Istanbul Restaurant"
	jsonLd={jsonLd}
/>

<!-- <Design_1/> -->

<HomeHero/>
<Hero/>


<InfoBar/>
<Gallery/>
<RelatedVenues/>
<PromoBanner/>

<!-- <Footer/> -->
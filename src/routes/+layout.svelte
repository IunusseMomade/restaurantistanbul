<script lang="ts">
	import './layout.css';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/state';

	let { children } = $props();
	export const prerender = true;

	let forceSolid = $derived(!['/', '/menu', '/about'].includes(page.route.id || ''));
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/favicon.png" type="image/png" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="shortcut icon" href="/favicon.png" />
</svelte:head>

<!-- <div class="overflow-x-hidden min-h-screen"> -->
	<LanguageSwitcher />
	<Navbar {forceSolid} />

	<svelte:boundary onerror={(e) => console.error(e)}>
		{#key page.url.pathname}
			{@render children()}
		{/key}
	</svelte:boundary>

	<Footer />
<!-- </div> -->

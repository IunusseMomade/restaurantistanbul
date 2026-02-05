<script>
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import { fade, fly } from 'svelte/transition';
	import bgImage from '$lib/assets/error-page.jpeg?enhanced';

	let status = $derived(page.status);
	let message = $derived(page.error?.message || m.error_unknown());
</script>

<svelte:head>
	<title>{status} - {status === 404 ? m.error_not_found_title() : 'Error'}</title>
</svelte:head>

<main class="relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden">
	<!-- Background -->
	<div class="absolute inset-0 z-0">
		<enhanced:img 
			src={bgImage} 
			alt="Atmospheric Restaurant Interior" 
			class="w-full h-full object-cover" 
		/>
		<div class="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
	</div>

	<!-- Content -->
	<div 
		class="relative z-10 container mx-auto px-6 text-center max-w-2xl"
		in:fly={{ y: 20, duration: 1000, delay: 100 }}
	>
		<h1 class="font-serif text-[120px] md:text-[180px] leading-none text-primary font-bold mb-4 drop-shadow-2xl">
			{status}
		</h1>
		
		<h2 class="font-serif text-3xl md:text-5xl text-white mb-6 italic">
			{#if status === 404}
				{m.error_404_heading_part1()} <span class="text-primary italic">{m.error_404_heading_part2()}</span>
			{:else}
				{m.error_generic_heading_part1()} <span class="text-primary italic">{m.error_generic_heading_part2()}</span>
			{/if}
		</h2>

		<div class="w-24 h-px bg-primary mx-auto mb-8"></div>

		<p class="text-gray-300 text-lg md:text-xl mb-12 font-light tracking-wide leading-relaxed">
			{#if status === 404}
				{m.error_404_description()}
			{:else}
				{message}
			{/if}
		</p>

		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a 
				href={localizeHref('/')}
				class="w-full sm:w-auto bg-primary text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
			>
				{m.error_back_home()}
			</a>
			<a 
				href={localizeHref('/menu')}
				class="w-full sm:w-auto border border-white text-white px-10 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
			>
				{m.error_view_menu()}
			</a>
		</div>
	</div>
</main>

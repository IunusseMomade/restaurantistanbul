<script>
	import { onMount } from 'svelte';
	import section1_1 from '$lib/assets/images/section1-1.jpeg?enhanced';
	import * as m from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';

	let heroReady = $state(false);

	onMount(() => {
		// trigger hero animations after first paint
		requestAnimationFrame(() => {
			heroReady = true;
		});
	});
</script>

<!-- Hero Section -->
<div class="relative h-[500px] w-full">
	<div class="absolute inset-0">
		<enhanced:img
			src={section1_1}
			alt="Luxury Dining"
			class={`h-full w-full object-cover hero-img ${heroReady ? 'is-ready' : ''}`}
		/>
		<div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
	</div>

	<div class="relative container mx-auto flex h-full items-center px-6 pt-24  md:pt-0">
		<div class={`max-w-xl text-white hero ${heroReady ? 'is-ready' : ''}`}>
			<h5 class="mb-4 text-overline text-primary hero-item hero-item-1">{m.hero_welcome()}</h5>

			<h1 class="font-serif mb-6 text-5xl leading-tight md:text-6xl hero-item hero-item-2">
				{@html m.home_header_h1_html()}
			</h1>

			<p class="mb-8 text-sm font-light leading-relaxed text-gray-200 md:text-base hero-item hero-item-3">
				{@html m.home_header_desc_html()}
			</p>

			<a
				href={localizeHref('/menu')}
				class="inline-block border border-primary bg-transparent px-8 py-3 text-overline text-white transition-all hover:bg-primary hover:text-white hero-item hero-item-4"
			>
				{m.btn_view_menu()}
			</a>
		</div>
	</div>
</div>

<!-- Venue Level Sub-Nav -->
<div class="hidden w-full border-t border-b border-gray-100 bg-[#FAFAFA] py-3 md:block">
	<div class="container mx-auto flex items-center justify-between px-6">
		<h2 class="font-serif text-xl tracking-wide text-gray-800">{m.subnav_explore()}</h2>
		<div class="flex gap-8 text-overline text-gray-500">
			<a href="#overview" class="-mb-3.5 border-b-2 border-primary pb-3 text-primary"
				>{m.subnav_overview()}</a
			>
			<a href="#signature-dishes" class="transition-colors hover:text-gray-900">{m.subnav_dishes()}</a>
			<a href="#gallery" class="transition-colors hover:text-gray-900">{m.subnav_gallery()}</a>
			<a href="#membership" class="transition-colors hover:text-gray-900">{m.subnav_membership()}</a>
			<a href="#info" class="transition-colors hover:text-gray-900">{m.subnav_info()}</a>
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.hero-img,
		.hero-item {
			animation: none !important;
			transition: none !important;
			transform: none !important;
			opacity: 1 !important;
		}
	}

	/* subtle hero image zoom */
	.hero-img {
		transform: scale(1.04);
		transition: transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
		will-change: transform;
	}
	.hero-img.is-ready {
		transform: scale(1);
	}

	/* staggered hero text reveal */
	.hero .hero-item {
		opacity: 0;
		transform: translateY(10px);
		animation: heroIn 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
		will-change: transform, opacity;
	}
	.hero:not(.is-ready) .hero-item {
		animation: none;
	}
	.hero.is-ready .hero-item-1 { animation-delay: 80ms; }
	.hero.is-ready .hero-item-2 { animation-delay: 150ms; }
	.hero.is-ready .hero-item-3 { animation-delay: 220ms; }
	.hero.is-ready .hero-item-4 { animation-delay: 290ms; }

	@keyframes heroIn {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

<script>
	import { Menu, X } from '@lucide/svelte';

	let isMenuOpen = $state(false);
</script>

<header class="flex w-full flex-col border-b border-gray-200 bg-white">
	<!-- Main Nav Bar -->
	<div class="container mx-auto flex items-center justify-between px-6 py-4">
		<!-- Brand Logo Placeholder -->
		<div class="flex items-center gap-2">
			<a href="/" class="flex items-center gap-2 text-inherit no-underline">
				<div class="font-serif text-3xl font-bold tracking-wider">SHAMIANA</div>
				<div class="mx-2 h-8 w-[1px] bg-gray-300"></div>
				<div class="text-xs leading-tight uppercase tracking-[0.2em] text-gray-500">
					Est.<br />1973<br />Mumbai
				</div>
			</a>
		</div>

		<!-- Desktop Nav Actions -->
		<div class="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
			<a href="/locations" class="link-hover">LOCATIONS</a>
			<a href="/menu" class="link-hover">MENU</a>
			<a href="/about" class="link-hover">OUR STORY</a>
			<a href="/contact" class="link-hover">CONTACT</a>

			<div class="ml-4 flex items-center gap-4">
				<a href="/login" class="border-b border-secondary pb-0.5 text-xs uppercase text-secondary hover:text-primary hover:border-primary transition-colors">Account</a>
				<button
					class="btn-primary px-6 py-2.5 text-xs"
				>
					Order Online
				</button>
			</div>
		</div>

		<!-- Mobile Menu Toggle -->
		<button class="md:hidden" onclick={() => (isMenuOpen = !isMenuOpen)}>
			{#if isMenuOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="border-t border-gray-100 bg-white px-6 py-6 md:hidden">
			<nav class="flex flex-col gap-6 text-sm font-medium tracking-wide">
				<a href="/locations" class="link-hover" onclick={() => (isMenuOpen = false)}>LOCATIONS</a>
				<a href="/menu" class="link-hover" onclick={() => (isMenuOpen = false)}>MENU</a>
				<a href="/about" class="link-hover" onclick={() => (isMenuOpen = false)}>OUR STORY</a>
				<a href="/contact" class="link-hover" onclick={() => (isMenuOpen = false)}>CONTACT</a>
				<div class="h-[1px] w-full bg-gray-100"></div>
				<div class="flex flex-col gap-4">
					<a
						href="/login"
						class="w-fit border-b border-secondary pb-0.5 text-xs uppercase text-secondary transition-colors hover:border-primary hover:text-primary"
						onclick={() => (isMenuOpen = false)}>Account</a
					>
					<button class="btn-primary w-full text-center"> Order Online </button>
				</div>
			</nav>
		</div>
	{/if}
</header>

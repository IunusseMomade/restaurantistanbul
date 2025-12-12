<script>
	import {
		Clock,
		Utensils,
		MapPin,
		Phone,
		ChevronRight,
		Instagram,
		Facebook,
		Twitter,
		Mail,
		Menu,
		X,
		Share2
	} from '@lucide/svelte';

	let isMenuOpen = $state(false);

	const galleryImages = [
		'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800', // Burger/Food
		'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', // Interior 1
		'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800', // Interior 2
		'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=800', // Interior 3
		'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800' // Food close up
	];

	const relatedVenues = [
		{
			id: 1,
			name: 'WASABI BY MORIMOTO',
			image:
				'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
			desc: 'Authentic Japanese culinary treasures from the Iron Chef.',
			cuisine: 'Japanese',
			hours: '12:30 PM - 11:45 PM'
		},
		{
			id: 2,
			name: 'AQUARIUS',
			image:
				'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600',
			desc: 'Al fresco dining by the pool with lush green surroundings.',
			cuisine: 'Finger Food',
			hours: '07:00 AM - 10:00 PM'
		},
		{
			id: 3,
			name: 'GOLDEN DRAGON',
			image:
				'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600',
			desc: 'The finest Sichuan and Cantonese cuisine in the city.',
			cuisine: 'Chinese',
			hours: '12:30 PM - 11:30 PM'
		}
	];

	const topStripImages = [
		'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop&q=60',
		'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop&q=60'
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="min-h-screen bg-white font-sans text-gray-800 selection:bg-[#C5A059] selection:text-white"
>
	<!-- --- 1. GLOBAL HEADER --- -->
	<header class="flex w-full flex-col border-b border-gray-200">
		<!-- Top Strip - Thumbnails -->
		<div class="hidden h-14 w-full overflow-hidden bg-gray-900 border-b border-gray-800 md:flex">
			{#each topStripImages as img, idx}
				<div class="group relative h-full flex-1 cursor-pointer border-r border-gray-800">
					<img
						src={img}
						alt="thumbnail"
						class="h-full w-full object-cover opacity-60 transition-opacity duration-300 filter grayscale group-hover:opacity-100 group-hover:grayscale-0"
					/>
				</div>
			{/each}
		</div>

		<!-- Main Nav Bar -->
		<div class="container mx-auto flex items-center justify-between px-6 py-4">
			<!-- Brand Logo Placeholder -->
			<div class="flex items-center gap-2">
				<div class="font-serif text-3xl font-bold tracking-wider">TAJ</div>
				<div class="mx-2 h-8 w-[1px] bg-gray-300"></div>
				<div class="text-xs leading-tight uppercase tracking-[0.2em] text-gray-500">
					Hotels<br />Palaces<br />Resorts
				</div>
			</div>

			<!-- Desktop Nav Actions -->
			<div class="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
				<a href="#destinations" class="transition-colors hover:text-[#C5A059]">DESTINATIONS</a>
				<a href="#hotels" class="transition-colors hover:text-[#C5A059]">HOTELS</a>
				<a href="#dining" class="transition-colors hover:text-[#C5A059]">DINING</a>
				<a href="#memberships" class="transition-colors hover:text-[#C5A059]">MEMBERSHIPS</a>

				<div class="ml-4 flex items-center gap-4">
					<a href="#login" class="border-b border-gray-800 pb-0.5 text-xs uppercase">Login / Join</a>
					<button
						class="bg-[#C5A059] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm transition-colors hover:bg-[#a68545]"
					>
						Book A Stay
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

		<!-- Venue Level Sub-Nav -->
		<div class="hidden w-full border-t border-b border-gray-100 bg-[#FAFAFA] py-3 md:block">
			<div class="container mx-auto flex items-center justify-between px-6">
				<h2 class="font-serif text-xl tracking-wide text-gray-800">SHAMIANA</h2>
				<div class="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
					<a href="#overview" class="-mb-3.5 border-b-2 border-[#C5A059] pb-3 text-[#C5A059]"
						>Overview</a
					>
					<a href="#menu" class="transition-colors hover:text-gray-900">Menu</a>
					<a href="#gallery" class="transition-colors hover:text-gray-900">Gallery</a>
					<a href="#offers" class="transition-colors hover:text-gray-900">Offers</a>
					<a href="#events" class="transition-colors hover:text-gray-900">Events</a>
					<a href="#reviews" class="transition-colors hover:text-gray-900">Reviews</a>
				</div>
			</div>
		</div>
	</header>

	<!-- --- 2. HERO SECTION --- -->
	<section class="container relative mx-auto px-6 py-16 md:py-20">
		<div class="absolute top-10 right-10 hidden text-[#C5A059] lg:block">
			<div class="rounded-full border border-[#C5A059] p-2">
				<Share2 size={16} />
			</div>
		</div>

		<!-- Title Block -->
		<div class="mx-auto mb-16 max-w-3xl text-center">
			<div class="mx-auto mb-6 h-[1px] w-16 bg-[#C5A059]"></div>
			<h1 class="font-serif mb-6 text-4xl leading-tight text-gray-900 md:text-6xl">
				MUMBAI'S FIRST <br />
				<span class="italic">COFFEE SHOP</span>
			</h1>
			<p
				class="mx-auto max-w-2xl text-sm font-light leading-relaxed text-gray-500 md:text-base"
			>
				Founded in 1973 as a coffee shop, Shamiana offers an all-day dining experience with an
				international à la carte menu, breakfast buffet, and Mumbai's most delicious weekend brunch.
			</p>
		</div>

		<!-- Split Content Grid -->
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
			<!-- Left: Image -->
			<div class="group relative overflow-hidden shadow-xl">
				<img
					src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1200"
					alt="Signature Pasta Dish"
					class="h-[400px] w-full transform object-cover transition-transform duration-700 ease-out group-hover:scale-105"
				/>
			</div>

			<!-- Right: Text Content -->
			<div class="flex h-full flex-col justify-center">
				<h2 class="font-serif relative mb-6 text-3xl text-gray-800 md:text-4xl">
					<span class="mr-3 text-[#C5A059]">—</span>
					EFFORTLESS <br /> ICONIC ALL-DAY <br /> DINING
				</h2>
				<p class="mb-6 text-sm font-light leading-7 text-gray-500">
					Step into Shamiana, where illustrious history meets modern comfort. From the legendary
					Shamiana Burger to our authentic local delicacies, every dish tells a story of Mumbai's
					culinary heritage combined with world-class hospitality.
				</p>

				<div class="space-y-2">
					<div class="flex items-center gap-2 text-sm text-gray-600">
						<span class="h-1.5 w-1.5 rounded-full bg-[#C5A059]"></span>
						<span>Signature Weekend Brunch</span>
					</div>
					<div class="flex items-center gap-2 text-sm text-gray-600">
						<span class="h-1.5 w-1.5 rounded-full bg-[#C5A059]"></span>
						<span>Live Music Evenings</span>
					</div>
					<div class="flex items-center gap-2 text-sm text-gray-600">
						<span class="h-1.5 w-1.5 rounded-full bg-[#C5A059]"></span>
						<span>Al Fresco Seating Available</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- --- 3. INFO & UTILITY BAR --- -->
	<section class="border-t border-gray-100 bg-gray-50 py-12">
		<div class="container mx-auto px-6">
			<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				<!-- Item 1 -->
				<div class="flex items-start gap-4 border-r border-gray-200 pr-4 last:border-0">
					<Clock class="mt-1 shrink-0 text-[#C5A059]" size={20} />
					<div>
						<h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400">
							Service Hours
						</h4>
						<p class="font-serif text-lg text-gray-800">24/7</p>
						<p class="mt-1 text-xs text-gray-500">Breakfast: 7am - 11am</p>
					</div>
				</div>

				<!-- Item 2 -->
				<div class="flex items-start gap-4 border-r border-gray-200 pr-4 last:border-0">
					<Utensils class="mt-1 shrink-0 text-[#C5A059]" size={20} />
					<div>
						<h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400">Cuisine</h4>
						<p class="font-serif text-lg text-gray-800">Multi-Cuisine</p>
						<p class="mt-1 text-xs text-gray-500">International & Local</p>
					</div>
				</div>

				<!-- Item 3 -->
				<div class="flex items-start gap-4 border-r border-gray-200 pr-4 last:border-0">
					<MapPin class="mt-1 shrink-0 text-[#C5A059]" size={20} />
					<div>
						<h4 class="mb-1 text-xs font-bold uppercase tracking-wider text-gray-400">Location</h4>
						<p class="font-serif text-lg text-gray-800">Apollo Bunder</p>
						<p class="mt-1 text-xs text-gray-500">Mumbai, 400 001, India</p>
					</div>
				</div>

				<!-- Item 4 -->
				<div class="flex items-start gap-4">
					<div class="flex w-full flex-col gap-3">
						<div class="flex items-center gap-2 text-xs text-gray-500">
							<Mail size={14} class="text-[#C5A059]" />
							<span>shamiana.bombay@tajhotels.com</span>
						</div>
						<div class="flex items-center gap-2 text-xs text-gray-500">
							<Phone size={14} class="text-[#C5A059]" />
							<span>+91 22 6665 3366</span>
						</div>
					</div>
				</div>
			</div>

			<div class="text-center">
				<button
					class="transform bg-[#C5A059] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#a68545] hover:shadow-lg"
				>
					Book A Table
				</button>
			</div>
		</div>
	</section>

	<!-- --- 4. GALLERY SECTION --- -->
	<section class="container mx-auto px-6 py-20">
		<div class="mb-12 flex items-center justify-center gap-6">
			<div class="h-[1px] w-16 bg-gray-300 md:w-24"></div>
			<h3 class="font-serif text-3xl uppercase tracking-widest text-gray-800">Gallery</h3>
			<div class="h-[1px] w-16 bg-gray-300 md:w-24"></div>
		</div>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
			<!-- Top Row -->
			<div class="group relative h-64 overflow-hidden md:col-span-1">
				<img
					src={galleryImages[0]}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					alt="Gallery 1"
				/>
				<div class="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent"></div>
			</div>
			<div class="group relative h-64 overflow-hidden md:col-span-1">
				<img
					src={galleryImages[1]}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					alt="Gallery 2"
				/>
				<div class="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent"></div>
			</div>
			<div class="group relative h-64 overflow-hidden md:col-span-1">
				<img
					src={galleryImages[2]}
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
					alt="Gallery 3"
				/>
				<div class="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent"></div>
			</div>

			<!-- Bottom Row Centered -->
			<div class="mt-0 flex flex-col justify-center gap-4 md:col-span-3 md:mt-2 md:flex-row md:gap-6">
				<div class="group relative h-64 overflow-hidden md:w-1/3">
					<img
						src={galleryImages[3]}
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						alt="Gallery 4"
					/>
				</div>
				<div class="group relative h-64 overflow-hidden md:w-1/3">
					<img
						src={galleryImages[4]}
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
						alt="Gallery 5"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- --- 5. RELATED VENUES CAROUSEL --- -->
	<section class="overflow-hidden border-t border-gray-100 bg-white py-20">
		<div
			class="container mx-auto mb-12 flex flex-col justify-between gap-6 px-6 md:flex-row md:items-end"
		>
			<div class="md:w-1/3">
				<div class="mb-4 flex items-center gap-4">
					<div class="h-[1px] w-12 bg-[#C5A059]"></div>
					<span class="text-xs font-bold uppercase tracking-widest text-gray-400">Discover More</span>
				</div>
				<h3 class="font-serif text-4xl leading-tight text-gray-900">
					RESTAURANTS <br /> IN MUMBAI
				</h3>
			</div>
			<div class="md:w-1/2">
				<p class="text-sm font-light leading-7 text-gray-500">
					Our master chefs offer a range of dining and bar experiences at The Taj Mahal Palace,
					Mumbai. From Indian and Chinese to continental and mediterranean, enjoy culinary magic in
					our restaurants, bars and lounges.
				</p>
			</div>
		</div>

		<!-- Carousel Container -->
		<div class="scrollbar-hide container mx-auto overflow-x-auto pb-10 px-6">
			<div class="flex min-w-max gap-8">
				{#each relatedVenues as venue (venue.id)}
					<div
						class="group w-[350px] cursor-pointer border border-transparent bg-white transition-all duration-300 hover:border-gray-100 hover:shadow-xl"
					>
						<div class="relative h-[220px] overflow-hidden">
							<img
								src={venue.image}
								alt={venue.name}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div
								class="absolute top-4 right-4 rounded-full bg-white/90 p-2 opacity-0 transition-opacity group-hover:opacity-100"
							>
								<ChevronRight size={16} class="text-[#C5A059]" />
							</div>
						</div>
						<div class="p-6">
							<h4
								class="font-serif mb-2 text-lg text-gray-900 transition-colors group-hover:text-[#C5A059]"
							>
								{venue.name}
							</h4>
							<p class="mb-4 h-8 text-xs text-gray-500 line-clamp-2">{venue.desc}</p>

							<div
								class="mb-6 grid grid-cols-2 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
							>
								<div class="flex items-center gap-1">
									<Utensils size={10} class="text-[#C5A059]" />
									{venue.cuisine}
								</div>
								<div class="flex items-center gap-1">
									<Clock size={10} class="text-[#C5A059]" /> Open Now
								</div>
							</div>

							<div class="flex items-center justify-between border-t border-gray-100 pt-4">
								<button
									class="bg-[#C5A059] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#967941]"
								>
									Book A Table
								</button>
								<span
									class="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900"
								>
									More +
								</span>
							</div>
						</div>
					</div>
				{/each}
				<!-- Duplicate for visual length -->
				{#each relatedVenues as venue (`${venue.id}-duplicate`)}
					<div
						class="group w-[350px] cursor-pointer border border-transparent bg-white transition-all duration-300 hover:border-gray-100 hover:shadow-xl"
					>
						<div class="relative h-[220px] overflow-hidden">
							<img
								src={venue.image}
								alt={venue.name}
								class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
						</div>
						<div class="p-6">
							<h4
								class="font-serif mb-2 text-lg text-gray-900 transition-colors group-hover:text-[#C5A059]"
							>
								{venue.name}
							</h4>
							<p class="mb-4 h-8 text-xs text-gray-500 line-clamp-2">{venue.desc}</p>
							<div
								class="mb-6 grid grid-cols-2 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-gray-400"
							>
								<div class="flex items-center gap-1">
									<Utensils size={10} class="text-[#C5A059]" />
									{venue.cuisine}
								</div>
								<div class="flex items-center gap-1">
									<Clock size={10} class="text-[#C5A059]" /> Open Now
								</div>
							</div>
							<div class="flex items-center justify-between border-t border-gray-100 pt-4">
								<button
									class="bg-[#C5A059] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-[#967941]"
									>Book A Table</button
								>
								<span
									class="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900"
									>More +</span
								>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- --- 6. PROMOTIONAL BANNER (NeuPass) --- -->
	<section class="relative flex h-[500px] w-full items-center overflow-hidden">
		<!-- Parallax-like Background -->
		<div class="absolute inset-0">
			<img
				src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=2000"
				alt="Palace Background"
				class="h-full w-full object-cover"
			/>
			<!-- Gradient Overlay -->
			<div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
		</div>

		<!-- Floating Content Card -->
		<div class="relative z-10 container mx-auto flex justify-end px-6">
			<div class="relative max-w-md overflow-hidden bg-white p-10 shadow-2xl md:p-12">
				<!-- Decorative Background blob -->
				<div
					class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-pink-100 opacity-50 blur-3xl"
				></div>

				<h3
					class="font-serif mb-4 text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
				>
					NEUPASS
				</h3>
				<p class="mb-8 text-sm leading-relaxed text-gray-600">
					Earn and redeem NeuCoins for exclusive member rates. With our NeuPass membership, you get
					immediate getaways guaranteed.
				</p>
				<a
					href="#learn-more"
					class="inline-block border-b border-gray-800 pb-1 text-xs font-bold uppercase tracking-widest text-gray-800 transition-colors hover:border-[#C5A059] hover:text-[#C5A059]"
				>
					Learn More
				</a>
			</div>
		</div>
	</section>

	<!-- --- 7. GLOBAL FOOTER --- -->
	<footer class="border-t-[3px] border-[#C5A059] bg-[#0a0a0a] pt-20 pb-8 text-white">
		<div class="container mx-auto px-6">
			<!-- Top Row: Brand & Newsletter -->
			<div class="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row">
				<div class="max-w-sm">
					<div class="font-serif mb-6 text-2xl tracking-widest">IHCL</div>
					<h5 class="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
						Subscribe to our newsletter
					</h5>
					<div class="flex border-b border-gray-700 pb-2">
						<input
							type="email"
							placeholder="Enter your email address"
							class="w-full border-none bg-transparent text-sm text-white placeholder-gray-600 outline-none"
						/>
						<button class="text-xs font-bold uppercase tracking-widest text-[#C5A059]"
							>Subscribe</button
						>
					</div>
				</div>

				<!-- Links Grid -->
				<div
					class="grid grid-cols-2 gap-x-12 gap-y-8 text-xs font-light leading-loose text-gray-400 md:grid-cols-4"
				>
					<div>
						<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">About Us</h6>
						<ul class="space-y-1">
							<li class="cursor-pointer hover:text-[#C5A059]">Our Heritage</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Management</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Responsibility</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Careers</li>
						</ul>
					</div>
					<div>
						<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">Support</h6>
						<ul class="space-y-1">
							<li class="cursor-pointer hover:text-[#C5A059]">Contact Us</li>
							<li class="cursor-pointer hover:text-[#C5A059]">FAQs</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Sitemap</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Gift Card</li>
						</ul>
					</div>
					<div>
						<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">Legal</h6>
						<ul class="space-y-1">
							<li class="cursor-pointer hover:text-[#C5A059]">Terms of Service</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Privacy Policy</li>
							<li class="cursor-pointer hover:text-[#C5A059]">Web Accessibility</li>
						</ul>
					</div>
					<div>
						<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">Social</h6>
						<div class="mt-2 flex gap-4">
							<Instagram size={18} class="cursor-pointer hover:text-[#C5A059]" />
							<Facebook size={18} class="cursor-pointer hover:text-[#C5A059]" />
							<Twitter size={18} class="cursor-pointer hover:text-[#C5A059]" />
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom Row: Logos & Copyright -->
			<div
				class="flex flex-col items-center justify-between gap-6 border-t border-gray-900 pt-8 md:flex-row"
			>
				<div
					class="flex flex-wrap justify-center gap-6 opacity-50 grayscale transition-all duration-500 hover:grayscale-0"
				>
					<!-- Brand Logos Placeholder - Using Text for simplicity but styled like logos -->
					<span class="font-serif text-lg italic">Taj</span>
					<span class="font-sans text-lg font-bold tracking-tighter">SELEQTIONS</span>
					<span class="font-serif text-lg font-bold">VIVANTA</span>
					<span class="font-mono text-lg">GINGER</span>
					<span class="font-serif text-lg italic">ama</span>
				</div>

				<div
					class="text-center text-[10px] uppercase tracking-widest text-gray-600 md:text-right"
				>
					© 2024 The Indian Hotels Company Limited. All Rights Reserved.
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	.font-serif {
		font-family: 'Playfair Display', serif;
	}
	.font-sans {
		font-family: 'Lato', sans-serif;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>

<script>
	import { ChevronRight, Utensils, Clock } from '@lucide/svelte';

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
</script>

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

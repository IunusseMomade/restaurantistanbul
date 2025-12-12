<script>
	import { Volume2, VolumeX, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	let currentIndex = $state(0);
	let isMuted = $state(true);
	let isPaused = $state(false);
	let progress = $state(0);
	let timer;

	const stories = [
		{
			type: 'image',
			src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
			duration: 5000,
			label: 'Our Atmosphere',
			desc: 'Dining under the warm glow of heritage.'
		},
		{
			type: 'video',
			src: 'https://videos.pexels.com/video-files/3196236/3196236-sd_540_960_25fps.mp4',
			duration: 8000,
			label: 'Behind the Scenes',
			desc: 'Precision and passion in every movement.'
		},
		{
			type: 'image',
			src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200',
			duration: 5000,
			label: 'Evening Service',
			desc: 'When the lights dim and the magic begins.'
		},
		{
			type: 'image',
			src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200',
			duration: 5000,
			label: 'Fresh Ingredients',
			desc: 'Sourced locally, prepared with love.'
		}
	];

	function startTimer() {
		clearInterval(timer);
		timer = setInterval(() => {
			if (!isPaused) {
				progress += 100 / (stories[currentIndex].duration / 50);
				if (progress >= 100) {
					next();
				}
			}
		}, 50);
	}

	function next() {
		progress = 0;
		if (currentIndex < stories.length - 1) {
			currentIndex++;
		} else {
			currentIndex = 0;
		}
	}

	function prev() {
		progress = 0;
		if (currentIndex > 0) {
			currentIndex--;
		} else {
			currentIndex = stories.length - 1;
		}
	}

	$effect(() => {
		progress = 0;
		startTimer();
		return () => clearInterval(timer);
	});
</script>

<section class="overflow-hidden bg-stone-50 py-24">
	<div class="container mx-auto px-6">
		<div class="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
			<!-- Text Content Side -->
			<div class="text-center lg:w-1/2 lg:text-left">
				<span class="mb-4 block text-overline font-bold tracking-widest text-primary"
					>Experience</span
				>
				<h3 class="mb-6 font-serif text-4xl leading-tight text-gray-900 md:text-5xl">
					STORIES FROM THE KITCHEN
				</h3>
				<p class="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-gray-600 lg:mx-0">
					Step behind the curtain and witness the magic as it happens. From the early morning market
					runs to the final garnish, follow our daily journey of culinary passion.
				</p>
				<div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
					<button class="btn-primary px-8 py-3 shadow-lg transition-all hover:shadow-xl"
						>Follow on Instagram</button
					>
					<button
						class="border border-gray-300 px-8 py-3 text-xs font-medium uppercase tracking-widest transition-colors hover:border-gray-900"
						>View Gallery</button
					>
				</div>
			</div>

			<!-- Cinematic Video Player Side -->
			<div class="relative w-full lg:w-1/2">
				<!-- Decorative offset elements -->
				<div
					class="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-xl border-2 border-gray-200 md:block"
				></div>
				<div
					class="absolute -bottom-4 -left-4 -z-10 hidden h-full w-full rounded-xl bg-stone-200 md:block"
				></div>

				<div
					class="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black shadow-2xl"
					onmouseenter={() => (isPaused = true)}
					onmouseleave={() => (isPaused = false)}
					role="region"
					aria-label="Story Player"
				>
					<!-- Media Content -->
					{#key currentIndex}
						<div class="absolute inset-0 h-full w-full" in:fade={{ duration: 800 }}>
							{#if stories[currentIndex].type === 'video'}
								<!-- svelte-ignore a11y_media_has_caption -->
								<video
									src={stories[currentIndex].src}
									class="h-full w-full object-cover"
									autoplay
									muted={isMuted}
									loop={false}
									playsinline
								></video>
							{:else}
								<img
									src={stories[currentIndex].src}
									alt={stories[currentIndex].label}
									class="h-full w-full object-cover transition-transform duration-[10000ms] ease-linear hover:scale-110"
								/>
							{/if}
						</div>
					{/key}

					<!-- Gradient Overlay -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
					></div>

					<!-- Content & Controls -->
					<div class="absolute bottom-0 left-0 w-full p-8 text-white">
						<div class="flex items-end justify-between">
							<div class="max-w-[70%]">
								<div class="mb-3 flex items-center gap-3">
									<span class="text-xs font-bold uppercase tracking-widest text-primary"
										>0{currentIndex + 1} / 0{stories.length}</span
									>
									<div class="h-[1px] w-12 bg-white/30"></div>
								</div>
								<h4 class="mb-2 font-serif text-3xl">{stories[currentIndex].label}</h4>
								<p class="text-sm font-light text-gray-300">{stories[currentIndex].desc}</p>
							</div>

							<!-- Controls -->
							<div class="flex items-center gap-4">
								<button
									onclick={() => (isMuted = !isMuted)}
									class="rounded-full bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/20"
									aria-label={isMuted ? 'Unmute' : 'Mute'}
								>
									{#if isMuted}<VolumeX size={18} />{:else}<Volume2 size={18} />{/if}
								</button>
								<div class="flex gap-2">
									<button
										onclick={prev}
										class="rounded-full bg-white p-3 text-black transition-colors hover:bg-gray-200"
										aria-label="Previous"
									>
										<ChevronLeft size={18} />
									</button>
									<button
										onclick={next}
										class="rounded-full bg-white p-3 text-black transition-colors hover:bg-gray-200"
										aria-label="Next"
									>
										<ChevronRight size={18} />
									</button>
								</div>
							</div>
						</div>

						<!-- Progress Line -->
						<div class="mt-6 h-[2px] w-full overflow-hidden rounded-full bg-white/20">
							<div
								class="h-full bg-primary transition-all duration-100 ease-linear"
								style="width: {progress}%"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

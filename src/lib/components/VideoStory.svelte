<script>
	import { Volume2, VolumeX } from '@lucide/svelte';
	
	let muted = $state(true);
	
	function toggleMute() {
		muted = !muted;
	}
</script>

<div class="relative h-screen w-full overflow-hidden bg-black">
	<video
		autoplay
		loop
		muted={muted}
		playsinline
		class="absolute inset-0 h-full w-full object-cover opacity-60"
	>
		<!-- Placeholder for the user to swap with their real video -->
		<source src="https://videos.pexels.com/video-files/3196066/3196066-uhd_2560_1440_25fps.mp4" type="video/mp4" />
	</video>

	<div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

	<div class="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
		<span class="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">The Experience</span>
		<h1 class="font-serif text-5xl md:text-8xl leading-tight">
			LIFE IS <br/> <span class="italic text-gray-300">DELICIOUS</span>
		</h1>
		<p class="mt-8 max-w-xl text-lg font-light text-gray-200 leading-relaxed">
			More than a restaurant, we are a gathering place for happy souls. 
			Where the laughter is as loud as the flavors are bold.
		</p>
	</div>

	<button 
		onclick={toggleMute}
		class="absolute bottom-10 right-10 z-20 rounded-full border border-white/20 bg-black/20 p-3 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
	>
		{#if muted}
			<VolumeX size={20} />
		{:else}
			<Volume2 size={20} />
		{/if}
	</button>
</div>

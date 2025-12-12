<script>
	import { Play } from '@lucide/svelte';
</script>

<section class="relative h-[600px] w-full overflow-hidden bg-black">
	<!-- Video Background Placeholder (Use a real video URL in production) -->
	<div class="absolute inset-0 opacity-60">
		<img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" 
            alt="Restaurant Ambience" 
            class="h-full w-full object-cover"
        />
        <!-- In a real scenario, use a video tag here:
		<video autoplay loop muted playsinline class="h-full w-full object-cover">
			<source src="/path/to/video.mp4" type="video/mp4" />
		</video> 
        -->
	</div>

	<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

	<div class="relative container mx-auto flex h-full flex-col items-center justify-center px-6 text-center text-white">
		<div class="mb-6 rounded-full border border-white/30 bg-white/10 p-4 backdrop-blur-sm transition-transform hover:scale-110 cursor-pointer">
			<Play fill="currentColor" class="ml-1 h-8 w-8 text-white" />
		</div>
		
		<h2 class="font-serif mb-4 text-4xl md:text-6xl">The Soul of Istanbul</h2>
		<p class="max-w-2xl text-lg font-light text-gray-200">
			Experience the vibrant energy, the laughter, and the timeless traditions that make every meal a celebration.
		</p>
	</div>
</section>

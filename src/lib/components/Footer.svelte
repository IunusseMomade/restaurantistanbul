<script>
	import { Instagram, Facebook, Twitter } from '@lucide/svelte';
</script>

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

			<div class="text-center text-[10px] uppercase tracking-widest text-gray-600 md:text-right">
				© 2024 The Indian Hotels Company Limited. All Rights Reserved.
			</div>
		</div>
	</div>
</footer>

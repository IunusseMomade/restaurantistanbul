<script>
	import { Instagram, Facebook, Twitter } from '@lucide/svelte';
</script>

<footer class="border-t-[3px] border-primary bg-[#0a0a0a] pt-20 pb-8 text-white">
	<div class="container mx-auto px-6">
		<!-- Top Row: Brand & Newsletter -->
		<div class="mb-16 flex flex-col items-start justify-between gap-10 md:flex-row">
			<div class="max-w-sm">
				<div class="font-serif mb-6 text-2xl tracking-widest">SHAMIANA</div>
				<h5 class="mb-4 text-overline text-gray-400">
					Subscribe to our newsletter
				</h5>
				<div class="flex border-b border-gray-700 pb-2">
					<input
						type="email"
						placeholder="Enter your email address"
						class="w-full border-none bg-transparent text-sm text-white placeholder-gray-600 outline-none"
					/>
					<button class="text-overline text-primary"
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
						<li class="cursor-pointer hover:text-primary">Our Story</li>
						<li class="cursor-pointer hover:text-primary">Our Chefs</li>
						<li class="cursor-pointer hover:text-primary">Sourcing</li>
						<li class="cursor-pointer hover:text-primary">Careers</li>
					</ul>
				</div>
				<div>
					<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">Support</h6>
					<ul class="space-y-1">
						<li class="cursor-pointer hover:text-primary">Contact Us</li>
						<li class="cursor-pointer hover:text-primary">FAQs</li>
						<li class="cursor-pointer hover:text-primary">Sitemap</li>
						<li class="cursor-pointer hover:text-primary">Gift Card</li>
					</ul>
				</div>
				<div>
					<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">Legal</h6>
					<ul class="space-y-1">
						<li class="cursor-pointer hover:text-primary">Terms of Service</li>
						<li class="cursor-pointer hover:text-primary">Privacy Policy</li>
						<li class="cursor-pointer hover:text-primary">Web Accessibility</li>
					</ul>
				</div>
				<div>
					<h6 class="mb-4 text-[10px] font-bold uppercase tracking-wider text-white">Social</h6>
					<div class="mt-2 flex gap-4">
						<Instagram size={18} class="cursor-pointer hover:text-brand-cyan" />
						<Facebook size={18} class="cursor-pointer hover:text-brand-cyan" />
						<Twitter size={18} class="cursor-pointer hover:text-brand-cyan" />
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
				<!-- Payment Methods or Partners -->
				<span class="font-sans text-xs font-bold tracking-widest">VISA</span>
				<span class="font-sans text-xs font-bold tracking-widest">MASTERCARD</span>
				<span class="font-sans text-xs font-bold tracking-widest">AMEX</span>
				<span class="font-sans text-xs font-bold tracking-widest">UPI</span>
			</div>

			<div class="text-center text-[10px] uppercase tracking-widest text-gray-600 md:text-right">
				© 2024 Shamiana Restaurants. All Rights Reserved.
			</div>
		</div>
	</div>
</footer>

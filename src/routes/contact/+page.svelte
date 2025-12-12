<script>
	import { Phone, Mail, Facebook, Instagram, Video, MapPin, Send } from '@lucide/svelte';
	import HeaderSimple from '$lib/components/HeaderSimple.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<HeaderSimple />

<div class="min-h-[60vh] bg-gray-50 py-20">
	<div class="container mx-auto px-6">
		<h1 class="mb-4 text-center font-serif text-4xl">Contact Us</h1>
		<p class="mx-auto mb-16 max-w-2xl text-center text-gray-600">
			Have a question or want to make a reservation? Reach out to us directly or follow our journey
			on social media.
		</p>

		<div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
			<!-- Left Column: Contact Info & Socials -->
			<div class="space-y-8">
				<!-- Contact Info -->
				<div class="rounded-lg border border-gray-200 bg-white p-8">
					<h2 class="mb-6 font-serif text-xl">Get in Touch</h2>

					<div class="space-y-6">
						<div class="flex items-start gap-4">
							<div class="rounded-full bg-primary/10 p-3 text-primary">
								<Phone size={20} />
							</div>
							<div>
								<h3 class="font-medium text-gray-900">Phone & WhatsApp</h3>
								<p class="mt-1 text-gray-600">+258 84 713 1300</p>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="rounded-full bg-primary/10 p-3 text-primary">
								<Mail size={20} />
							</div>
							<div>
								<h3 class="font-medium text-gray-900">Email</h3>
								<a
									href="mailto:mozambik.istanbul@gmail.com"
									class="mt-1 block text-gray-600 transition-colors hover:text-primary"
								>
									mozambik.istanbul@gmail.com
								</a>
							</div>
						</div>

						<div class="flex items-start gap-4">
							<div class="rounded-full bg-primary/10 p-3 text-primary">
								<MapPin size={20} />
							</div>
							<div>
								<h3 class="font-medium text-gray-900">Main Location</h3>
								<p class="mt-1 text-gray-600">
									Rua Ngungunhane, 85 - Loja G 25 R/C<br />Maputo Shopping Center
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Socials -->
				<div class="rounded-lg border border-gray-200 bg-white p-8">
					<h2 class="mb-6 font-serif text-xl">Follow Us</h2>
					<div class="flex flex-wrap gap-4">
						<a
							href="https://www.facebook.com/restaurant.ist"
							target="_blank"
							rel="noopener noreferrer"
							class="group flex items-center gap-3 rounded-full border border-gray-200 px-5 py-2.5 transition-all hover:border-primary hover:bg-primary/5"
						>
							<Facebook size={18} class="text-gray-400 group-hover:text-primary" />
							<span class="text-sm font-medium text-gray-700 group-hover:text-primary"
								>Facebook</span
							>
						</a>

						<a
							href="https://www.instagram.com/restaurantistambul"
							target="_blank"
							rel="noopener noreferrer"
							class="group flex items-center gap-3 rounded-full border border-gray-200 px-5 py-2.5 transition-all hover:border-primary hover:bg-primary/5"
						>
							<Instagram size={18} class="text-gray-400 group-hover:text-primary" />
							<span class="text-sm font-medium text-gray-700 group-hover:text-primary"
								>Instagram</span
							>
						</a>

						<a
							href="https://tiktok.com/@restaurantistambul"
							target="_blank"
							rel="noopener noreferrer"
							class="group flex items-center gap-3 rounded-full border border-gray-200 px-5 py-2.5 transition-all hover:border-primary hover:bg-primary/5"
						>
							<Video size={18} class="text-gray-400 group-hover:text-primary" />
							<span class="text-sm font-medium text-gray-700 group-hover:text-primary">TikTok</span>
						</a>
					</div>
				</div>
			</div>

			<!-- Right Column: Contact Form -->
			<div class="rounded-lg border border-gray-200 bg-white p-8 lg:p-10">
				<h2 class="mb-2 font-serif text-2xl">Send a Message</h2>
				<p class="mb-8 text-sm text-gray-500">
					We'll get back to you as soon as possible.
				</p>

				<form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
					<div class="grid gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<label for="name" class="text-xs font-bold uppercase tracking-wider text-gray-500"
								>Name</label
							>
							<input
								type="text"
								id="name"
								placeholder="Your name"
								class="w-full border-b border-gray-300 bg-transparent py-2 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary"
							/>
						</div>
						<div class="space-y-2">
							<label for="email" class="text-xs font-bold uppercase tracking-wider text-gray-500"
								>Email</label
							>
							<input
								type="email"
								id="email"
								placeholder="your@email.com"
								class="w-full border-b border-gray-300 bg-transparent py-2 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary"
							/>
						</div>
					</div>

					<div class="space-y-2">
						<label for="subject" class="text-xs font-bold uppercase tracking-wider text-gray-500"
							>Subject</label
						>
						<select
							id="subject"
							class="w-full border-b border-gray-300 bg-transparent py-2 text-gray-900 outline-none transition-colors focus:border-primary"
						>
							<option>General Inquiry</option>
							<option>Reservation Request</option>
							<option>Private Event</option>
							<option>Feedback</option>
						</select>
					</div>

					<div class="space-y-2">
						<label for="message" class="text-xs font-bold uppercase tracking-wider text-gray-500"
							>Message</label
						>
						<textarea
							id="message"
							rows="4"
							placeholder="How can we help you?"
							class="w-full resize-none border-b border-gray-300 bg-transparent py-2 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary"
						></textarea>
					</div>

					<button
						type="submit"
						class="mt-4 flex w-full items-center justify-center gap-2 bg-gray-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary"
					>
						<span>Send Message</span>
						<Send size={14} />
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<Footer />

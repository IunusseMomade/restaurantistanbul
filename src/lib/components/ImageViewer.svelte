<script>
	import { X, ChevronLeft, ChevronRight, ShoppingBag } from '@lucide/svelte';
	
	let {
		images = [],
		items = [],
		onClose,
		onAddToCart = null,
		initialIndex = 0,
		initialItemIndex = 0,
		labels = {}
	} = $props();
	let currentIndex = $state(0);
	let currentItemIndex = $state(0);
	let currentImageIndex = $state(0);

	const isItemMode = $derived((items?.length ?? 0) > 0);
	const currentItem = $derived(isItemMode ? items[currentItemIndex] : null);
	const currentImages = $derived(
		isItemMode
			? (
				Array.isArray(currentItem?.images) && currentItem.images.length
					? currentItem.images.filter(Boolean)
					: (currentItem?.image ? [currentItem.image] : [])
			)
			: images
	);
	const currentSrc = $derived(isItemMode ? currentImages[currentImageIndex] : images[currentIndex]);

	const uiLabels = $derived({
		close: labels?.close || 'Close',
		prevItem: labels?.prevItem || 'Previous item',
		nextItem: labels?.nextItem || 'Next item',
		addToCart: labels?.addToCart || 'Add to cart',
		itemLabel: labels?.itemLabel || 'Item'
	});

	$effect(() => {
		if (isItemMode) {
			const maxItemIndex = (items?.length ?? 0) - 1;
			if (maxItemIndex < 0) {
				currentItemIndex = 0;
				currentImageIndex = 0;
				return;
			}
			const nextItemIndex = Math.min(Math.max(Number(initialItemIndex) || 0, 0), maxItemIndex);
			currentItemIndex = nextItemIndex;
			currentImageIndex = 0;
			return;
		}

		const maxIndex = (images?.length ?? 0) - 1;
		if (maxIndex < 0) {
			currentIndex = 0;
			return;
		}
		const nextIndex = Math.min(Math.max(Number(initialIndex) || 0, 0), maxIndex);
		currentIndex = nextIndex;
	});

	/** @param {any=} e */
	function next(e) {
		e?.stopPropagation();
		if (!images?.length) return;
		currentIndex = (currentIndex + 1) % images.length;
	}

	/** @param {any=} e */
	function prev(e) {
		e?.stopPropagation();
		if (!images?.length) return;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	/** @param {any=} e */
	function nextItem(e) {
		e?.stopPropagation();
		if (!items?.length) return;
		currentItemIndex = (currentItemIndex + 1) % items.length;
		currentImageIndex = 0;
	}

	/** @param {any=} e */
	function prevItem(e) {
		e?.stopPropagation();
		if (!items?.length) return;
		currentItemIndex = (currentItemIndex - 1 + items.length) % items.length;
		currentImageIndex = 0;
	}

	/** @param {any=} e */
	function nextImage(e) {
		e?.stopPropagation();
		if (!currentImages?.length) return;
		currentImageIndex = (currentImageIndex + 1) % currentImages.length;
	}

	/** @param {any=} e */
	function prevImage(e) {
		e?.stopPropagation();
		if (!currentImages?.length) return;
		currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
	}

	/** @param {any=} e */
	function addCurrentItemToCart(e) {
		e?.stopPropagation();
		if (!isItemMode || !currentItem || !onAddToCart) return;
		onAddToCart(currentItem);
	}

	/** @param {KeyboardEvent} e */
	function handleKeydown(e) {
		if (e.key === 'ArrowRight') {
			if (isItemMode) nextItem();
			else next();
		}
		if (e.key === 'ArrowLeft') {
			if (isItemMode) prevItem();
			else prev();
		}
		if (e.key === 'Escape') onClose();
		if (isItemMode && currentImages?.length > 1) {
			if (e.key.toLowerCase() === 'd') nextImage();
			if (e.key.toLowerCase() === 'a') prevImage();
		}
	}

</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div 
	class="image-viewer-overlay"
	onclick={(e) => {
		if (e.target === e.currentTarget) onClose();
	}}
	role="dialog"
	tabindex="-1"
	aria-modal="true"
>
	<button 
		class="close-button"
		onclick={onClose}
		aria-label={uiLabels.close}
	>
		<X size={28} />
	</button>
	
	{#if isItemMode && items.length > 1}
		<button class="nav-button prev" onclick={prevItem} aria-label={uiLabels.prevItem}>
			<ChevronLeft size={30} />
		</button>
		<button class="nav-button next" onclick={nextItem} aria-label={uiLabels.nextItem}>
			<ChevronRight size={30} />
		</button>
	{:else if !isItemMode && images.length > 1}
		<button class="nav-button prev" onclick={prev} aria-label="Previous image">
			<ChevronLeft size={30} />
		</button>
		<button class="nav-button next" onclick={next} aria-label="Next image">
			<ChevronRight size={30} />
		</button>
	{/if}

	{#if isItemMode && currentImages.length > 1}
		<button class="image-nav-button image-prev" onclick={prevImage} aria-label="Previous photo">
			<ChevronLeft size={26} />
		</button>
		<button class="image-nav-button image-next" onclick={nextImage} aria-label="Next photo">
			<ChevronRight size={26} />
		</button>
	{/if}

	<enhanced:img
		src={currentSrc}
		alt="Full view"
		class="full-image"
	/>

	{#if isItemMode}
		<div class="item-strip" role="group" aria-label={uiLabels.itemLabel}>
			<div class="item-mini-meta">
				<h3 class="item-mini-title" title={currentItem?.name}>{currentItem?.name}</h3>
				<div class="item-mini-price">{currentItem?.price} MZN</div>
			</div>
			{#if onAddToCart}
				<button
					class="icon-action-btn"
					type="button"
					onclick={addCurrentItemToCart}
					aria-label={uiLabels.addToCart}
					title={uiLabels.addToCart}
				>
					<ShoppingBag size={17} />
				</button>
			{/if}
		</div>
	{/if}

	{#if isItemMode && currentImages.length > 1}
		<div class="dots">
			{#each currentImages as _, i}
				<button 
					class="dot {i === currentImageIndex ? 'active' : ''}"
					onclick={(e) => { e.stopPropagation(); currentImageIndex = i; }}
					aria-label={`Go to image ${i + 1}`}
				></button>
			{/each}
		</div>
	{:else if !isItemMode && images.length > 1}
		<div class="dots">
			{#each images as _, i}
				<button 
					class="dot {i === currentIndex ? 'active' : ''}"
					onclick={(e) => { e.stopPropagation(); currentIndex = i; }}
					aria-label="Go to image {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
.image-viewer-overlay {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
z-index: 99999;
background-color: rgba(0, 0, 0, 0.95);
display: flex;
align-items: center;
justify-content: center;
padding: 1rem;
backdrop-filter: blur(4px);
animation: fadeIn 0.2s ease-out forwards;
}

.close-button {
position: absolute;
top: 1rem;
right: 1rem;
color: rgba(255, 255, 255, 0.72);
background: none;
border: none;
cursor: pointer;
transition: color 0.2s;
z-index: 100000;
}

.close-button:hover {
color: #c5a059;
}

.nav-button {
position: absolute;
top: 50%;
transform: translateY(-50%);
background: rgba(0, 0, 0, 0.42);
color: #fff;
border: none;
padding: 0.42rem;
cursor: pointer;
z-index: 100000;
border-radius: 9999px;
display: flex;
align-items: center;
justify-content: center;
transition: background 0.2s;
}

.nav-button:hover {
background: rgba(197, 160, 89, 0.82);
}

.prev {
left: 0.9rem;
}

.next {
right: 0.9rem;
}

.image-nav-button {
position: absolute;
top: 1rem;
background: rgba(0, 0, 0, 0.5);
color: #fff;
border: 1px solid rgba(255, 255, 255, 0.2);
padding: 0.35rem;
cursor: pointer;
z-index: 100000;
border-radius: 9999px;
display: flex;
align-items: center;
justify-content: center;
transition: background 0.2s;
}

.image-nav-button:hover {
background: rgba(197, 160, 89, 0.82);
}

.image-prev {
right: 4.7rem;
}

.image-next {
right: 2.35rem;
}

.full-image {
max-width: 100%;
max-height: 92vh;
object-fit: contain;
border-radius: 4px;
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.item-strip {
position: absolute;
left: 0.75rem;
right: 0.75rem;
bottom: 0.75rem;
z-index: 100000;
background: linear-gradient(135deg, rgba(17, 17, 17, 0.92), rgba(8, 8, 8, 0.78));
border: 1px solid rgba(255, 255, 255, 0.15);
border-radius: 9999px;
backdrop-filter: blur(8px);
padding: 0.38rem 0.42rem 0.38rem 0.8rem;
color: #f5f5f5;
max-width: 560px;
margin-inline: auto;
display: flex;
align-items: center;
justify-content: space-between;
gap: 0.45rem;
}

.item-mini-meta {
min-width: 0;
display: flex;
align-items: baseline;
gap: 0.5rem;
}

.item-mini-title {
margin: 0;
font-size: 0.86rem;
font-weight: 600;
line-height: 1;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: min(62vw, 360px);
}

.item-mini-price {
font-size: 0.84rem;
font-weight: 700;
color: #c5a059;
white-space: nowrap;
}

.icon-action-btn {
border: 1px solid rgba(197, 160, 89, 0.5);
cursor: pointer;
padding: 0.42rem;
border-radius: 9999px;
color: #f5e2bb;
background: rgba(197, 160, 89, 0.15);
transition: transform 0.16s ease, box-shadow 0.16s ease;
display: inline-flex;
align-items: center;
justify-content: center;
}

.icon-action-btn:hover {
transform: translateY(-1px);
box-shadow: 0 8px 20px rgba(197, 160, 89, 0.3);
}

.dots {
position: absolute;
bottom: 2.25rem;
left: 50%;
transform: translateX(-50%);
display: flex;
gap: 0.45rem;
z-index: 100000;
}

.dot {
width: 8px;
height: 8px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.3);
border: none;
cursor: pointer;
padding: 0;
transition: all 0.2s;
}

.dot.active {
background: #c5a059;
transform: scale(1.15);
}

@media (min-width: 768px) {
.item-strip {
left: 2rem;
right: 2rem;
bottom: 1rem;
padding: 0.42rem 0.45rem 0.42rem 0.95rem;
max-width: 640px;
}

.item-mini-title {
font-size: 0.92rem;
max-width: min(50vw, 460px);
}

.item-mini-price {
font-size: 0.9rem;
}
}

@media (max-width: 767px) {
.nav-button {
padding: 0.35rem;
}

.prev {
left: 0.65rem;
}

.next {
right: 0.65rem;
}

.close-button {
top: 0.7rem;
right: 0.7rem;
}

.image-prev {
right: 4.5rem;
}

.image-next {
right: 2.35rem;
}

.item-strip {
left: 0.5rem;
right: 0.5rem;
bottom: 0.5rem;
padding: 0.3rem 0.34rem 0.3rem 0.62rem;
gap: 0.35rem;
}

.item-mini-title {
font-size: 0.8rem;
max-width: min(52vw, 230px);
}

.item-mini-price {
font-size: 0.8rem;
}

.icon-action-btn {
padding: 0.35rem;
}

.full-image {
max-height: 82vh;
}

.dots {
bottom: 2rem;
}
}

@keyframes fadeIn {
from {
opacity: 0;
}

to {
opacity: 1;
}
}
</style>

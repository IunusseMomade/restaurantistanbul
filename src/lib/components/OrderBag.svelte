<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';
  import * as m from '$lib/paraglide/messages';

  // Props: phone number (WhatsApp) and enhanced image source for the bag
  let { phone = '258847131300', bagImage } = $props();

  type MenuItem = { name: string; description?: string; price: string; image?: string };
  type IncomingMenuItem = { name: unknown; description?: unknown; price: unknown; image?: unknown };
  type CartItem = MenuItem & { quantity: number };
  type PersistedCartItem = { name: string; description?: string; price: string; quantity: number };

  const CART_STORAGE_KEY = 'order-bag-cart-v1';

  // Component state
  let cart = $state<CartItem[]>([]);
  let isCartOpen = $state(false);
  let showTutorial = $state(false);
  let showCheckoutHint = $state(false);
  let checkoutTimer: ReturnType<typeof setTimeout>;
  let storageReady = $state(false);

  function loadCartFromStorage() {
    try {
      if (typeof sessionStorage === 'undefined') return;
      const raw = sessionStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;

      const restored: CartItem[] = parsed
        .filter((item): item is PersistedCartItem =>
          !!item &&
          typeof item.name === 'string' &&
          typeof item.price === 'string' &&
          typeof item.quantity === 'number'
        )
        .map((item) => ({
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: item.quantity
        }));

      if (restored.length) cart = restored;
    } catch {
      // Ignore malformed or unavailable storage.
    }
  }

  function persistCartToStorage(nextCart: CartItem[] = cart) {
    try {
      if (typeof sessionStorage === 'undefined') return;
      if (!storageReady) return;

      const serializable: PersistedCartItem[] = nextCart.map((item) => ({
        name: String(item.name ?? ''),
        description: item.description == null ? undefined : String(item.description),
        price: String(item.price ?? '0'),
        quantity: item.quantity
      }));

      sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(serializable));
    } catch {
      // Ignore storage quota/private mode issues.
    }
  }

  $effect(() => {
    // Re-run whenever cart mutates.
    persistCartToStorage(cart);
  });

  function getCartTotal() {
    return cart.reduce((total, item) => {
      // Clean price string more aggressively to handle currencies
      const price = parseInt(item.price?.replace(/[^0-9]/g, '') || '0') || 0;
      return total + price * item.quantity;
    }, 0);
  }

  function getCartCount() {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  function imageToSrc(image: unknown): string | undefined {
    if (typeof image === 'string') return image;
    if (!image || typeof image !== 'object') return undefined;

    const maybeEnhanced = image as { img?: { src?: unknown }; src?: unknown };
    if (typeof maybeEnhanced.img?.src === 'string') return maybeEnhanced.img.src;
    if (typeof maybeEnhanced.src === 'string') return maybeEnhanced.src;

    return undefined;
  }

  // Exposed API for parent: call via `bind:this` -> componentRef.addToCart(item)
  export function addToCart(item: IncomingMenuItem) {
    const normalizedName = String(item.name ?? '');
    const normalizedDescription = item.description == null ? undefined : String(item.description);
    const normalizedPrice = String(item.price ?? '0');
    const normalizedImage = imageToSrc(item.image);

    const idx = cart.findIndex((i) => i.name === normalizedName);
    if (idx > -1) cart[idx].quantity += 1;
    else cart.push({
      name: normalizedName,
      description: normalizedDescription,
      price: normalizedPrice,
      image: normalizedImage,
      quantity: 1
    });

    persistCartToStorage(cart);

    showTutorial = false;

    // Restart checkout hint timer
    showCheckoutHint = false;
    clearTimeout(checkoutTimer);
    checkoutTimer = setTimeout(() => {
      if (cart.length > 0 && !isCartOpen) {
        showCheckoutHint = true;
        setTimeout(() => (showCheckoutHint = false), 8000);
      }
    }, 3000);
  }

  function removeFromCart(index: number) {
    cart.splice(index, 1);
    persistCartToStorage(cart);
    if (cart.length === 0) {
      isCartOpen = false;
      setTimeout(() => {
        if (cart.length === 0) {
          showTutorial = true;
          setTimeout(() => (showTutorial = false), 8000);
        }
      }, 1500);
    }
  }

  function updateQuantity(index: number, delta: number) {
    const newQty = cart[index].quantity + delta;
    if (newQty > 0) {
      cart[index].quantity = newQty;
      persistCartToStorage(cart);
    } else removeFromCart(index);
  }

  function proceedToOrder() {
    const itemsList = cart.map(i => `- ${i.quantity}x ${i.name} (${i.price})`).join('\n');
    const total = getCartTotal();
    const message = `${m.bag_wa_greeting()}\n\n${itemsList}\n\n*${m.bag_wa_total()}: ${total}MT*`;
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    isCartOpen = false;
    // tiny UX hook: open WhatsApp in new tab/window
    window.open(waLink, '_blank');
  }

  onMount(() => {
    loadCartFromStorage();
    storageReady = true;
    // Ensure storage reflects restored state immediately after hydration.
    persistCartToStorage(cart);

    const initialTimer = setTimeout(() => {
      if (cart.length === 0) showTutorial = true;
    }, 1500);

    const hideTimer = setTimeout(() => {
      if (showTutorial) showTutorial = false;
    }, 8000);

    const reminderTimer = setTimeout(() => {
      if (cart.length === 0 && !isCartOpen) {
        showTutorial = true;
        setTimeout(() => (showTutorial = false), 8000);
      }
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearTimeout(reminderTimer);
      clearTimeout(checkoutTimer);
    };
  });
</script>

<div class="order-bag"> 
  <!-- FAB -->
  <div class="fixed left-4 top-[55%] md:top-[42%] z-40 flex items-center gap-2.5 sm:gap-3" transition:scale={{ duration: 200, start: 0.8 }}>
    <button on:click={() => (isCartOpen = true)} aria-label={m.bag_open_label()} class="relative transition-transform active:scale-95 hover:scale-105">
      {#if bagImage}
        <enhanced:img src={bagImage} alt="Cesto" class="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg" />
      {:else}
        <!-- Changed default bg color for fallback icon -->
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#1d140e] flex items-center justify-center text-white">🧺</div>
      {/if}

      {#if getCartCount() > 0}
        <!-- Changed badge color to brand gold (#C5A059) -->
        <span class="absolute -top-0.5 -right-1 sm:-top-0.5 sm:-right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-[#C5A059] text-[8px] sm:text-[9px] font-bold text-white shadow-sm ring-2 ring-white">{getCartCount()}</span>
      {/if}
    </button>

    {#if showTutorial && cart.length === 0}
      <!-- Changed notification bg to lighter gold (#EBC85E) for better contrast -->
      <div class="relative bg-[#EBC85E] text-[#1d140e] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl shadow flex items-center gap-2 sm:gap-2.5 w-max max-w-[200px] sm:max-w-[230px]" transition:fly={{ x: -20, duration: 400 }}>
        <!-- Arrow matches bg -->
        <div class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EBC85E] rotate-45"></div>
        <div class="flex items-center gap-3">
          <div class="bg-black/10 p-1 rounded-full">🧾</div>
          <div>
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-wide mb-0.5">{m.bag_start_order()}</p>
            <p class="text-[8px] sm:text-[9px] font-bold opacity-80">{m.bag_tap_to_add()}</p>
          </div>
        </div>
      </div>
    {:else if showCheckoutHint && cart.length > 0}
      <!-- Changed notification bg to lighter gold (#EBC85E) -->
      <div class="relative bg-[#EBC85E] text-[#1d140e] px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl shadow flex items-center gap-2 sm:gap-2.5 w-max max-w-[200px] sm:max-w-[230px]" transition:fly={{ x: -20, duration: 400 }}>
        <!-- Arrow matches bg -->
        <div class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EBC85E] rotate-45"></div>
        <div class="flex items-center gap-3">
          <div class="bg-black/10 p-1 rounded-full">📣</div>
          <div>
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-wide mb-0.5">{m.bag_finish_order()}</p>
            <p class="text-[8px] sm:text-[9px] font-bold opacity-80">{m.bag_tap_to_send()}</p>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Cart Drawer -->
  {#if isCartOpen}
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" transition:fade={{ duration: 200 }} on:click={() => (isCartOpen = false)}></div>

      <div class="relative z-10 bg-white w-full sm:w-[400px] h-[85vh] sm:h-screen rounded-t-3xl sm:rounded-none sm:rounded-l-3xl shadow-2xl flex flex-col" transition:fly={{ y: 100, duration: 300 }} role="dialog" aria-modal="true">
        <div class="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-xl font-black">{m.bag_my_order()} <span class="text-sm font-normal text-gray-500">({getCartCount()} {m.bag_items()})</span></h2>
          <button class="p-2 text-gray-400 hover:text-[#ee1b21] rounded-full" on:click={() => (isCartOpen = false)}>✕</button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-4">
          {#if cart.length === 0}
            <div class="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
              <div class="bg-gray-50 p-6 rounded-full">🧺</div>
              <p class="text-sm font-medium text-[#1d140e]">{m.bag_empty_title()}</p>
              <p class="text-xs text-gray-500 max-w-[200px]">{m.bag_empty_desc()}</p>
            </div>
          {:else}
            {#each cart as item, i (`${item.name}-${i}`)}
              <div class="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                {#if item.image}
                  <img src={item.image} alt={item.name} class="w-16 h-16 object-contain rounded bg-white" loading="lazy" decoding="async" />
                {/if}
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-1">
                    <p class="text-sm font-bold text-[#1d140e] line-clamp-2">{item.name}</p>
                    <!-- Changed cart item price color to brand gold (#C5A059) -->
                    <p class="text-xs font-bold text-[#C5A059] ml-2">{item.price}</p>
                  </div>
                  <div class="flex items-center gap-3 mt-2">
                    <div class="flex items-center bg-white rounded-lg border border-gray-200 h-8">
                      <button on:click={() => updateQuantity(i, -1)} class="w-8 h-full flex items-center justify-center text-gray-500">-</button>
                      <span class="w-6 text-center text-xs font-bold text-[#1d140e]">{item.quantity}</span>
                      <button on:click={() => updateQuantity(i, 1)} class="w-8 h-full flex items-center justify-center text-gray-500">+</button>
                    </div>
                    <button on:click={() => removeFromCart(i)} class="text-[10px] text-gray-400 font-bold hover:text-red-500 underline">{m.bag_remove()}</button>
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>

        <div class="p-6 bg-white border-t border-gray-100 pb-8 sm:pb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-gray-500">{m.bag_estimated_total()}</span>
            <span class="text-xl font-black text-[#1d140e]">{getCartTotal()} MT</span>
          </div>
          <button on:click={proceedToOrder} disabled={cart.length === 0} class="w-full bg-[#1d140e] text-white font-black py-4 rounded-xl disabled:opacity-50 disabled:pointer-events-none">
            {m.bag_order_whatsapp()}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* minimal styling — rely on project Tailwind if present */
  .order-bag { }
</style>

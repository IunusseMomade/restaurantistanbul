<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade, scale } from 'svelte/transition';

  // Props: phone number (WhatsApp) and enhanced image source for the bag
  let { phone = '258847131300', bagImage } = $props();

  type MenuItem = { name: string; description?: string; price: string; image?: any };
  type CartItem = MenuItem & { quantity: number };

  // Component state
  let cart = $state<CartItem[]>([]);
  let isCartOpen = $state(false);
  let showTutorial = $state(false);
  let showCheckoutHint = $state(false);
  let checkoutTimer: ReturnType<typeof setTimeout>;

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

  // Exposed API for parent: call via `bind:this` -> componentRef.addToCart(item)
  export function addToCart(item: MenuItem) {
    const idx = cart.findIndex((i) => i.name === item.name);
    if (idx > -1) cart[idx].quantity += 1;
    else cart.push({ ...item, quantity: 1 });

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
    if (newQty > 0) cart[index].quantity = newQty;
    else removeFromCart(index);
  }

  function proceedToOrder() {
    const itemsList = cart.map(i => `- ${i.quantity}x ${i.name} (${i.price})`).join('\n');
    const total = getCartTotal();
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${itemsList}\n\n*Total: ${total}MT*`;
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    isCartOpen = false;
    // tiny UX hook: open WhatsApp in new tab/window
    window.open(waLink, '_blank');
  }

  onMount(() => {
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
  <div class="fixed left-6 top-[55%] md:top-[40%] z-40 flex items-center gap-4" transition:scale={{ duration: 200, start: 0.8 }}>
    <button on:click={() => (isCartOpen = true)} aria-label="Abrir cesto" class="relative transition-transform active:scale-95 hover:scale-105">
      {#if bagImage}
        <enhanced:img src={bagImage} alt="Cesto" class="sm:w-24 sm:h-24 w-18 h-18  object-contain drop-shadow-lg" />
      {:else}
        <!-- Changed default bg color for fallback icon -->
        <div class="w-20 h-20 rounded-lg bg-[#1d140e] flex items-center justify-center text-white">🧺</div>
      {/if}

      {#if getCartCount() > 0}
        <!-- Changed badge color to brand gold (#C5A059) -->
        <span class="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C5A059] text-[10px] font-bold text-white shadow-sm ring-2 ring-white">{getCartCount()}</span>
      {/if}
    </button>

    {#if showTutorial && cart.length === 0}
      <!-- Changed notification bg to lighter gold (#EBC85E) for better contrast -->
      <div class="relative bg-[#EBC85E] text-[#1d140e] px-4 py-3 rounded-xl shadow flex items-center gap-3 w-max max-w-[260px]" transition:fly={{ x: -20, duration: 400 }}>
        <!-- Arrow matches bg -->
        <div class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EBC85E] rotate-45"></div>
        <div class="flex items-center gap-3">
          <div class="bg-black/10 p-1.5 rounded-full">🧾</div>
          <div>
            <p class="text-xs font-black uppercase tracking-wide mb-0.5">Comece o pedido</p>
            <p class="text-[10px] font-bold opacity-80">Toque no nome do prato para adicionar</p>
          </div>
        </div>
      </div>
    {:else if showCheckoutHint && cart.length > 0}
      <!-- Changed notification bg to lighter gold (#EBC85E) -->
      <div class="relative bg-[#EBC85E] text-[#1d140e] px-4 py-3 rounded-xl shadow flex items-center gap-3 w-max max-w-[260px]" transition:fly={{ x: -20, duration: 400 }}>
        <!-- Arrow matches bg -->
        <div class="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EBC85E] rotate-45"></div>
        <div class="flex items-center gap-3">
          <div class="bg-black/10 p-1.5 rounded-full">📣</div>
          <div>
            <p class="text-xs font-black uppercase tracking-wide mb-0.5">Finalizar Pedido</p>
            <p class="text-[10px] font-bold opacity-80">Toque no cesto para enviar o seu pedido</p>
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
          <h2 class="text-xl font-black">MEU PEDIDO <span class="text-sm font-normal text-gray-500">({getCartCount()} itens)</span></h2>
          <button class="p-2 text-gray-400 hover:text-[#ee1b21] rounded-full" on:click={() => (isCartOpen = false)}>✕</button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-4">
          {#if cart.length === 0}
            <div class="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
              <div class="bg-gray-50 p-6 rounded-full">🧺</div>
              <p class="text-sm font-medium text-[#1d140e]">O seu cesto está vazio.</p>
              <p class="text-xs text-gray-500 max-w-[200px]">Toque no nome do prato para adicionar ao pedido.</p>
            </div>
          {:else}
            {#each cart as item, i}
              <div class="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                {#if item.image}
                  <enhanced:img src={item.image} alt={item.name} class="w-16 h-16 object-contain rounded bg-white" />
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
                    <button on:click={() => removeFromCart(i)} class="text-[10px] text-gray-400 font-bold hover:text-red-500 underline">REMOVER</button>
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>

        <div class="p-6 bg-white border-t border-gray-100 pb-8 sm:pb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-gray-500">Total Estimado</span>
            <span class="text-xl font-black text-[#1d140e]">{getCartTotal()} MT</span>
          </div>
          <button on:click={proceedToOrder} disabled={cart.length === 0} class="w-full bg-[#1d140e] text-white font-black py-4 rounded-xl disabled:opacity-50 disabled:pointer-events-none">
            Pedir Agora via WhatsApp
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

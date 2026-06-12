<!-- <script>
	import ImageViewer from '$lib/components/ImageViewer.svelte';

	import dish_akdeniz_salatasi from '$lib/assets/images/menu/extracted-images/Akdeniz Salatası.png?enhanced';
	import dish_avci_boregi from '$lib/assets/images/menu/extracted-images/Avcı Böreği 2.png?enhanced';
	import dish_cacik from '$lib/assets/images/menu/extracted-images/Cacık.png?enhanced';
	import dish_cevizli_salata from '$lib/assets/images/menu/extracted-images/Cevizli Salata.png?enhanced';
	import dish_chamussas from '$lib/assets/images/menu/extracted-images/Chamussas.png?enhanced';
	import dish_classic_hamburger from '$lib/assets/images/menu/extracted-images/Classic Hamburger.png?enhanced';
	import dish_cuban_onion_molho_cockte from '$lib/assets/images/menu/extracted-images/Cuban Onion Molho Cockte.png?enhanced';
	import dish_dose_de_arroz_mix from '$lib/assets/images/menu/extracted-images/Dose de Arroz Mix.png?enhanced';
	import dish_dose_de_batata from '$lib/assets/images/menu/extracted-images/Dose de Batata.png?enhanced';
	import dish_durum_doner from '$lib/assets/images/menu/extracted-images/Dürüm Döner.png?enhanced';
	import dish_especial_istambul from '$lib/assets/images/menu/extracted-images/Especial Istambul.png?enhanced';
	import dish_frango_inteiro_grelhado from '$lib/assets/images/menu/extracted-images/Frango Inteiro Grelhado.png?enhanced';
	import dish_humus from '$lib/assets/images/menu/extracted-images/Humus.png?enhanced';
	import dish_kavurmali_yumurta from '$lib/assets/images/menu/extracted-images/Kavurmalı Yumurta.png?enhanced';
	import dish_menemen from '$lib/assets/images/menu/extracted-images/Menemen.png?enhanced';
	import dish_mini_pequeno_almoco from '$lib/assets/images/menu/extracted-images/Mini Pequeno Almoço.png?enhanced';
	import dish_omlete_simples from '$lib/assets/images/menu/extracted-images/Omlete Simples.png?enhanced';
	import dish_pequeno_almoco_completo from '$lib/assets/images/menu/extracted-images/Pequeno Almoço Completo.png?enhanced';
	import dish_porsiyon_doner from '$lib/assets/images/menu/extracted-images/Porsiyon Döner.png?enhanced';
	import dish_prego_no_pao from '$lib/assets/images/menu/extracted-images/Prego no pao.png?enhanced';
	import dish_rissois from '$lib/assets/images/menu/extracted-images/Rissóis.png?enhanced';
	import dish_sopa_de_cabeca from '$lib/assets/images/menu/extracted-images/Sopa de Cabeça.png?enhanced';
	import dish_sopa_de_dobrada from '$lib/assets/images/menu/extracted-images/Sopa de Dobrada.png?enhanced';
	import dish_sopa_de_lentilha from '$lib/assets/images/menu/extracted-images/Sopa de Lentilha.png?enhanced';
	import dish_sopa_de_mariscos from '$lib/assets/images/menu/extracted-images/Sopa de Mariscos.png?enhanced';
	import dish_sopa_de_peixe from '$lib/assets/images/menu/extracted-images/Sopa de Peixe.png?enhanced';
	import dish_sopa_de_vegetais from '$lib/assets/images/menu/extracted-images/Sopa de Vegetais.png?enhanced';
	import dish_tavuk_doner from '$lib/assets/images/menu/extracted-images/Tavuk Döner.png?enhanced';
	import dish_tavuk_durum from '$lib/assets/images/menu/extracted-images/Tavuk Dürüm.png?enhanced';
	import dish_tavuk_salatasi from '$lib/assets/images/menu/extracted-images/Tavuk Salatası.png?enhanced';
	import dish_tombik_doner from '$lib/assets/images/menu/extracted-images/Tombik Döner.png?enhanced';
	import dish_tombik_sandvic from '$lib/assets/images/menu/extracted-images/Tombik Sandviç.png?enhanced';
	import dish_ton_balikli_salata from '$lib/assets/images/menu/extracted-images/Ton Balıklı Salata.png?enhanced';
	import dish_torrada from '$lib/assets/images/menu/extracted-images/Torrada.png?enhanced';
	import dish_tosta_de_atum from '$lib/assets/images/menu/extracted-images/Tosta De Atum.png?enhanced';
	import dish_tosta_de_fiambre from '$lib/assets/images/menu/extracted-images/Tosta De Fiambre.png?enhanced';
	import dish_tosta_de_franga from '$lib/assets/images/menu/extracted-images/Tosta De Franga.png?enhanced';
	import dish_tosta_de_queijo from '$lib/assets/images/menu/extracted-images/Tosta De Queijo.png?enhanced';
	import dish_tosta_mista from '$lib/assets/images/menu/extracted-images/Tosta Mista.png?enhanced';
	import dish_yogurt from '$lib/assets/images/menu/extracted-images/Yoğurt.png?enhanced';
	import dish_zinguer from '$lib/assets/images/menu/extracted-images/Zinguer.png?enhanced';
	import dish_coban_salatasi from '$lib/assets/images/menu/extracted-images/Çoban Salatası.png?enhanced';
	import dish_iskender_kebap from '$lib/assets/images/menu/extracted-images/İskender Kebap.png?enhanced';
	import dish_icli_kofte from '$lib/assets/images/menu/extracted-images/İçli Köfte.png?enhanced';

	const galleryImages = [
		dish_akdeniz_salatasi,
		dish_avci_boregi,
		dish_cacik,
		dish_cevizli_salata,
		dish_chamussas,
		dish_classic_hamburger,
		dish_cuban_onion_molho_cockte,
		dish_dose_de_arroz_mix,
		dish_dose_de_batata,
		dish_durum_doner,
		dish_especial_istambul,
		dish_frango_inteiro_grelhado,
		dish_humus,
		dish_kavurmali_yumurta,
		dish_menemen,
		dish_mini_pequeno_almoco,
		dish_omlete_simples,
		dish_pequeno_almoco_completo,
		dish_porsiyon_doner,
		dish_prego_no_pao,
		dish_rissois,
		dish_sopa_de_cabeca,
		dish_sopa_de_dobrada,
		dish_sopa_de_lentilha,
		dish_sopa_de_mariscos,
		dish_sopa_de_peixe,
		dish_sopa_de_vegetais,
		dish_tavuk_doner,
		dish_tavuk_durum,
		dish_tavuk_salatasi,
		dish_tombik_doner,
		dish_tombik_sandvic,
		dish_ton_balikli_salata,
		dish_torrada,
		dish_tosta_de_atum,
		dish_tosta_de_fiambre,
		dish_tosta_de_franga,
		dish_tosta_de_queijo,
		dish_tosta_mista,
		dish_yogurt,
		dish_zinguer,
		dish_coban_salatasi,
		dish_iskender_kebap,
		dish_icli_kofte
	];

	let isViewerOpen = $state(false);
	let viewerStartIndex = $state(0);

	/** @param {number} index */
	function openViewer(index) {
		viewerStartIndex = index;
		isViewerOpen = true;
	}
</script>

<section class="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-10 text-white md:px-6">
	<div class="space-y-2">
		<p class="text-sm uppercase tracking-[0.35em] text-amber-200">Menu gallery</p>
		<h1 class="text-3xl font-semibold md:text-4xl">These images are ready to view</h1>
		<p class="max-w-2xl text-sm text-slate-300 md:text-base">Click any card to open the full image viewer.</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
		{#each galleryImages as image, index (image)}
			<button
				type="button"
				onclick={() => openViewer(index)}
				class="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-amber-300/50"
			>
				<enhanced:img
					src={image}
					alt={`Gallery image ${index + 1}`}
					class="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
				/>
				<div class="p-3">
					<p class="text-xs uppercase tracking-[0.25em] text-amber-200">Image {index + 1}</p>
				</div>
			</button>
		{/each}
	</div>

	{#if isViewerOpen}
		<ImageViewer
			images={galleryImages}
			initialIndex={viewerStartIndex}
			onClose={() => (isViewerOpen = false)}
		/>
	{/if}
</section>
 -->

<div>
    This is a test page
</div>
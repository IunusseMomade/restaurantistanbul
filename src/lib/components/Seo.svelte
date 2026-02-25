<script lang="ts">
	interface JsonLd {
		'@context': string;
		'@type': string;
		[key: string]: any;
	}

	interface Props {
		title: string;
		description?: string;
		keywords?: string;
		jsonLd?: JsonLd | null;
		noindex?: boolean;
		nofollow?: boolean;
		googleSiteVerification?: string;
		image?: string;
		url?: string;
		siteName?: string;
		type?: string;
	}

	let {
		title,
		description = '',
		keywords = '',
		jsonLd = null,
		noindex = false,
		nofollow = false,
		googleSiteVerification = '',
		image = '',
		url = '',
		siteName = '',
		type = 'website'
	}: Props = $props();
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {#if keywords}
        <meta name="keywords" content={keywords} />
    {/if}
    
    {#if googleSiteVerification}
        <meta name="google-site-verification" content={googleSiteVerification} />
    {/if}
    <!-- Robots -->
    <meta
        name="robots"
        content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`}
    />
    <meta
        name="googlebot"
        content={`${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`}
    />
    
    {#if url}
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
    {/if}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {#if siteName}
        <meta property="og:site_name" content={siteName} />
    {/if}
    {#if image}
        <meta property="og:image" content={image} />
        <meta name="twitter:image" content={image} />
    {/if}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    {#if jsonLd}
        {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
    {/if}
</svelte:head>
<script lang="ts">
    import { page } from '$app/state';
    import { baseLocale, deLocalizeHref, locales, localizeHref } from '$lib/paraglide/runtime';

	interface JsonLd {
		'@context': string;
		'@type': string;
		[key: string]: any;
	}

    interface AlternateLink {
        lang: string;
        href: string;
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

    function toNormalizedAbsoluteUrl(input: string, origin: string): URL | null {
        try {
            const parsed = new URL(input, origin);
            parsed.hash = '';
            if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
                parsed.pathname = parsed.pathname.slice(0, -1);
            }
            return parsed;
        } catch {
            return null;
        }
    }

    const canonicalUrl = $derived.by(() => {
        const fallback = `${page.url.origin}${page.url.pathname}`;
        const parsed = toNormalizedAbsoluteUrl(url || fallback, page.url.origin);
        return parsed ? parsed.toString() : fallback;
    });

    const alternates = $derived.by((): AlternateLink[] => {
        const parsedCanonical = toNormalizedAbsoluteUrl(canonicalUrl, page.url.origin);
        if (!parsedCanonical) return [];

        const deLocalizedPath = deLocalizeHref(parsedCanonical.pathname);

        return locales.map((locale) => {
            const localizedPath = localizeHref(deLocalizedPath, { locale });
            const localizedUrl = new URL(localizedPath, parsedCanonical.origin);
            if (localizedUrl.pathname !== '/' && localizedUrl.pathname.endsWith('/')) {
                localizedUrl.pathname = localizedUrl.pathname.slice(0, -1);
            }

            return {
                lang: locale,
                href: localizedUrl.toString()
            };
        });
    });

    const xDefaultHref = $derived.by(
        () => alternates.find((alternate) => alternate.lang === baseLocale)?.href ?? canonicalUrl
    );
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
    
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:url" content={canonicalUrl} />
    {#each alternates as alternate}
        <link rel="alternate" hreflang={alternate.lang} href={alternate.href} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={xDefaultHref} />

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
import { locales, localizeHref } from '$lib/paraglide/runtime';

export const prerender = true;

const SITE_URL = 'https://restaurantistanbul.pages.dev'; // TODO: Update this to your persistent domain
const pages = ['/', '/about', '/contact', '/locations', '/menu'];

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const body = sitemap(pages);
	
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map((page: string) => {
			return locales.flatMap((locale) => {
				const path = localizeHref(page, { locale });
				const loc = `${SITE_URL}${path === '/' ? '' : path}`;

				const priority = page === '/' ? '1.0' : '0.8';
				const changefreq = 'weekly';

				const links = locales
					.map((l: (typeof locales)[number]) => {
						const altPath = localizeHref(page, { locale: l });
						return `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${altPath === '/' ? '' : altPath}" />`;
					})
					.join('');

				return `
  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${links}
  </url>
  `;
			}).join('');
		})
		.join('')}
</urlset>`;

import { locales, baseLocale } from '$lib/paraglide/runtime';

export const prerender = true;

const SITE_URL = 'https://restaurantistanbul.pages.dev'; // TODO: Update this to your persistent domain
const pages = ['', 'about', 'contact', 'locations', 'menu'];

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const body = sitemap(pages);
	
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}

const sitemap = (/** @type {string[]} */ pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
		.map((page) => {
      // Loop over all locales to generate entries
			return locales.flatMap((locale) => {
        // Construct path based on locale and page
        // Assuming 'url' strategy where baseLocale is at root, and others are prefixed
        // If your strategy is different (e.g. all prefixed), adjust logic below.
        
        let path = '';
        
        if (locale === baseLocale) {
           path = page === '' ? '' : `/${page}`;
        } else {
           path = page === '' ? `/${locale}` : `/${locale}/${page}`;
        }

        const loc = `${SITE_URL}${path}`;
        
        // Check for specific priority or changefreq if needed
        const priority = page === '' ? '1.0' : '0.8';
        const changefreq = 'weekly';

        // Generate alternates for this page/locale combo
        const links = locales.map(l => {
             let altPath = '';
             if (l === baseLocale) {
               altPath = page === '' ? '' : `/${page}`;
             } else {
               altPath = page === '' ? `/${l}` : `/${l}/${page}`;
             }
             return `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${altPath}" />`;
        }).join('');

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

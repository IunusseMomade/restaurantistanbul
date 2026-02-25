export const prerender = true;

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    return new Response(
        `User-agent: *
Allow: /

Sitemap: https://restaurantistanbul.pages.dev/sitemap.xml`,
        {
            headers: {
                'content-type': 'text/plain; charset=utf-8'
            }
        }
    );
}

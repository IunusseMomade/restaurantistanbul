export const paraglideStrategy = ['url', 'cookie', 'baseLocale'];

export const paraglideUrlPatterns = [
	{
		pattern: '/',
		localized: [
			['tr', '/tr'],
			['en', '/en'],
			['pt', '/']
		]
	},
	{
		pattern: '/about',
		localized: [
			['tr', '/tr/hakkimizda'],
			['en', '/en/about'],
			['pt', '/sobre']
		]
	},
	{
		pattern: '/contact',
		localized: [
			['tr', '/tr/iletisim'],
			['en', '/en/contact'],
			['pt', '/contato']
		]
	},
	{
		pattern: '/locations',
		localized: [
			['tr', '/tr/konumlar'],
			['en', '/en/locations'],
			['pt', '/localizacoes']
		]
	},
	{
		pattern: '/menu',
		localized: [
			['tr', '/tr/menu'],
			['en', '/en/menu'],
			['pt', '/menu']
		]
	}
];

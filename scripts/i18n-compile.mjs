import { compile } from '@inlang/paraglide-js';
import { paraglideStrategy, paraglideUrlPatterns } from '../paraglide.config.js';

await compile({
	project: './project.inlang',
	outdir: './src/lib/paraglide',
	strategy: paraglideStrategy,
	urlPatterns: paraglideUrlPatterns
});

console.log('[i18n] Paraglide compiled with custom strategy and translated url patterns.');

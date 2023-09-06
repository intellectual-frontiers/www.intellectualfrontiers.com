import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Intellectual Frontiers',
			social: {
				github: 'https://github.com/intellectual-frontiers',
			},
			sidebar: [
				{
					label: 'Use Cases',
					autogenerate: { directory: 'use-cases' },
				},
				{
					label: 'Patents',
					autogenerate: { directory: 'patents' },
				},
			],
		}),
	],
});

const { Preset, flags, Log } = require('use-preset');

module.exports = Preset.make({
	name: 'Laravel TALL',

	parse: () => ({
		flags: {
			auth: flags.boolean({ default: false }),
		},
	}),

	actions: context => [
		{
			type: 'edit-json',
			file: 'package.json',
			merge: {
				devDependencies: {
					'@tailwindcss/ui': '^0.1',
					alpinejs: '^2.0',
					'laravel-mix-tailwind': '^0.1.0',
					tailwindcss: '^1.4',
				},
			},
			delete: ['devDependencies.lodash', 'devDependencies.axios'],
		},
		{
			type: 'edit-json',
			file: 'composer.json',
			merge: {
				require: {
					'livewire/livewire': '^1.2',
				},
			},
		},
		{
			type: 'delete',
			directories: 'resources/sass',
		},
		{
			type: 'copy',
			directories: 'default',
			strategy: 'override',
		},
		{
			type: 'copy',
			if: context => Boolean(context.flags.auth),
			directories: 'auth',
			strategy: 'override',
		},
		{
			type: 'edit',
			files: [
				'app/Providers/RouteServiceProvider.php',
				'app/Http/Middleware/RedirectIfAuthenticated.php',
			],
			replace: [
				{
					search: `public const HOME = '/home';`,
					with: `public const HOME = '/';`,
				},
				{
					search: `RouteServiceProvider::HOME`,
					with: `route('home')`,
				},
			],
		},
	],
	after(context) {
		if (context.flags.auth) {
			Log.info(`Authentication has been scaffolded.`);
		}

		Log.info(
			`You can now run ${Log.colors.yellow(
				'composer update',
			)} to install Livewire, and ${Log.colors.yellow(
				'npm install',
			)} to install NPM dependencies.`,
		);
	},
});

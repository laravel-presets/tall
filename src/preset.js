const { Preset, Prompt, flags, Log, Color } = require('use-preset');
const spawn = require('cross-spawn');

module.exports = Preset.make({
	name: 'Laravel TALL',

	parse: () => ({
		flags: {
			auth: flags.boolean({ default: false }),
		},
	}),

	actions: () => [
		{
			type: 'edit-json',
			file: 'package.json',
			merge: {
				devDependencies: {
					'@tailwindcss/ui': '^0.1',
					'laravel-mix-tailwind': '^0.1.0',
					alpinejs: '^2.0',
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
	after: async context => {
		if (context.flags.auth) {
			Log.info(`Authentication has been scaffolded.`);
		}

		// Propose to install dependencies
		if (await Prompt.confirm('Do you want to install NPM dependencies now?')) {
			await context.installDependencies();
			Log.success('Successfully installed dependencies.');
		}

		// prettier-ignore
		if (await Prompt.confirm(`Do you want to run ${Color.blue('composer update')} to install Livewire?`)) {
			const { status, output } = spawn.sync('composer', ['update']);
			if (status !== 0) {
				output
					.join(' ')
					.split('\n')
					.filter(Boolean)
					.forEach(message => {
						Log.fatal(message.trim())
					})
			} else {
				Log.success('Updated composer dependencies.')
			}
		}
	},
});

const { Preset } = require('use-preset');

// prettier-ignore
module.exports = Preset.make('Laravel TALL')
	.option('auth', false)

	.editJson('package.json')
		.title('Add Tailwind and Alpine')
		.merge({
			devDependencies: {
				'@tailwindcss/ui': '^0.1',
				alpinejs: '^2',
				tailwindcss: '^1',
				'postcss-nested': '^4',
				'postcss-import': '^12',
			},
		})
		.delete(['devDependencies.lodash', 'devDependencies.axios'])
		.chain()

	.editJson('composer.json')
		.title('Add Livewire')
		.merge({
			require: {
				'livewire/livewire': '^1.2',
			}
		})
		.chain()
		
	.delete()
		.title('Delete SASS')
		.directories('resources/sass')
		.chain()

	.copyDirectory('default')
		.to('/')
		.title('Copy templates')
		.whenConflict('override')
		.chain()

	.copyDirectory('auth')
		.to('/')
		.title('Scaffold authentication')
		.if(({ flags }) => Boolean(flags.auth))
		.whenConflict('override')
		.chain()

	.edit(['app/Providers/RouteServiceProvider.php', 'app/Http/Middleware/RedirectIfAuthenticated.php'])
		.title('Update route configuration')
		.replace(`public const HOME = '/home';`).with(`public const HOME = '/';`)
		.replace(`public const HOME = '/home';`).with(`public const HOME = '/';`)
		.replace(`$namespace = 'App\\Http\\Controllers'`).with(`$namespace = ''`)
		.chain()

	.installDependencies()
		.for('node')
		.title('Install node dependencies')
		.chain()

	.updateDependencies()
		.for('php')
		.title('Install PHP dependencies')
		.chain();

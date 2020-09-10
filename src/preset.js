const { Preset } = require('use-preset');

// prettier-ignore
module.exports = Preset.make('Laravel TALL')
	.option('auth', true)
	.option('pagination', true)
	.option('interaction', true)

	.apply('use-preset/laravel-tailwindcss')
		.with('--no-interaction')
		.title('Add Tailwind CSS from its preset')
		.chain()

	.editJson('package.json')
		.title('Add Alpine.js, remove Lodash & Axios')
		.merge({
			devDependencies: {
				alpinejs: '^2',
			},
		})
		.delete(['devDependencies.lodash', 'devDependencies.axios'])
		.chain()

	.editJson('composer.json')
		.title('Add Livewire')
		.merge({
			require: {
				'livewire/livewire': '^2.0',
			}
		})
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
		.replace(`$namespace = 'App\\Http\\Controllers'`).with(`$namespace = ''`)
		.chain()

	.edit('app/Providers/AppServiceProvider.php')
		.title('Setup pagination')
		.if(({ flags }) => Boolean(flags.pagination))
		.search(/public function boot\(\)/)
			.addAfter([
				`{`,
				`    Paginator::defaultView('pagination::default');`,
				`    Paginator::defaultSimpleView('pagination::simple-default');`,
			])
			.removeAfter(2) // Removes opening curly bracket and comment
			.end()
		.chain()

	.installDependencies()
		.if(({ flags }) => Boolean(flags.interaction))
		.for('node')
		.title('Install node dependencies')
		.chain()

	.updateDependencies()
		.if(({ flags }) => Boolean(flags.interaction))
		.for('php')
		.title('Install PHP dependencies')
		.chain();

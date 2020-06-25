<p align="center">
  <h1 align="center">Laravel TALL</h1>
  <p align="center">
    <a href="https://github.com/use-preset/use-preset/releases">
      <img alt="npx use-preset tall" src="https://img.shields.io/badge/use--preset-laravel--tall-blue?style=flat-square">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/package/use-preset">
      <img alt="use-preset version" src="https://img.shields.io/npm/v/use-preset?color=32c854&style=flat-square&label=use-preset">
    </a>
    &nbsp;
    <a href="https://github.com/use-preset/laravel-tall/actions">
      <img alt="build status" src="https://github.com/use-preset/laravel-tall/workflows/tests/badge.svg?style=flat-square" >
    </a>
  </p>
  <br />
  <p align="center">
    <code>use-preset</code> is a scaffolding tool for developers. <a href="https://docs.usepreset.dev/">Read the documentation</a> for more informations.
  </p>
  <br />
  <pre align="center">npx use-preset laravel-tall</pre>
  &nbsp;
<p>

# About

> This preset is a port of [`laravel-frontend-presets/tall`](https://github.com/laravel-frontend-presets/tall/) from [Liam Hammett](https://twitter.com/LiamHammett)

This Laravel preset scaffolds an application using the [`TALL`](https://tallstack.dev/) stack, jumpstarting your application's development.

If you are not familiar with the name, it is an acronym that describes the main technologies involved in the stack:

| Tailwind CSS                | Alpine.js                    | Laravel       | Livewire                        |
| --------------------------- | ---------------------------- | ------------- | ------------------------------- |
| Utility-first CSS framework | Minimal Javascript framework | PHP framework | Full-stack UI Laravel framework |

# Installation

This preset is intended to be installed into a fresh Laravel application. Follow the [Laravel installation instructions](https://laravel.com/docs/7.x/installation) to ensure you have a working environment before continuing.

**Then, run the following commands**:

```bash
npx use-preset laravel-tall --auth
composer update
```

The `composer update` command is needed because the preset will add `livewire/livewire` to your `composer.json` file.

## Authentication

If you don't want the preset to install the authentication scaffolding, just omit the `--auth` flag.

Some notable features of the authentication scaffolding include:

- Livewire components ans single action controllers
- Pre-written tests

All routes, components, controllers and tests are published to your application. The idea behind this is that you have full control over every aspect of the scaffolding in your own app, removing the need to dig around in the vendor folder to figure out how things are working.

> **Note**: as opposed to other Laravel front-end presets, the authentication logic is published to your application. It means that `laravel/ui` is not required at all.

## Pagination

If you are using pagination, you set the default pagination views to the ones provided in the boot method of a service provider:

```php
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Paginator::defaultView('pagination::default');
        Paginator::defaultSimpleView('pagination::simple-default');
    }
}
```

# To-do

- Propose to automatically run `composer update`, then `npm install` or `yarn install`
- Add the pagination by default, with a `--no-pagination` flag to omit them

# Credits

- [Dan Harrin](https://github.com/DanHarrin)
- [Liam Hammett](https://github.com/imliam)
- [Ryan Chandler](https://github.com/ryangjchandler)
- [Tailwind UI](https://tailwindui.com/) for the default authentication and pagination views
- [`laravel-frontend-presets/tall`'s contributors](https://github.com/laravel-frontend-presets/tall/contributors)
- [`use-preset`](https://github.com/use-preset/use-preset)
